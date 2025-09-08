// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // store file in memory buffer

const Project = require("../models/Project");
const { authenticateJWT } = require("../middleware/middleware.js");
const Folder = require("../models/Folder.js");
const File = require("../models/File.js");
const User = require("../models/User.js");
const Blob = require("../models/Blob.js");

const tmp = require("tmp-promise");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);
require("dotenv").config(); // Load .env file variables
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function errorHandling(error) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: error,
    config: {
      systemInstruction:
        "You are a LaTeX error-solving AI. For any LaTeX error input, respond only with the following details: Error: Copy the exact LaTeX error message. Line: Specify the line number(s) where the error occurs (if available). Cause: Explain why the error occurs. Fix: Give the exact solution, including the corrected LaTeX command or code snippet - If you know the exact solution, and any minimal changes needed in the document to resolve the error. Do not add anything else. Focus entirely on providing a precise, actionable fix.",
    },
  });
  console.log(response.text);
  return response.text;
}

router.post("/askGemini", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ error: "You are not logged in" });
  }
  const { input } = req.body;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: input,
    config: {
      systemInstruction:
        "Your are an AI Assitant and your name is Latexwriter.AI",
    },
  });
  console.log(response.text);
  return res.json({ text: response.text });
});
router.post("/debugerror", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ error: "You are not logged in" });
  }
  const { error } = req.body;
  const debuggedError = await errorHandling(error);

  return res.json({ debuggedError });
});

async function writeProjectToTemp(dirPath, folders, files, parentId) {
  try {
    // Create all folders under parentId
    const childFolders = folders.filter(
      (f) => f.parent?.toString() === parentId?.toString()
    );

    for (const folder of childFolders) {
      const folderPath = path.join(dirPath, folder.name);
      fs.mkdirSync(folderPath, { recursive: true });
      await writeProjectToTemp(folderPath, folders, files, folder._id);
    }

    // Write files under parentId
    const childFiles = files.filter(
      (f) => f.parent?.toString() === parentId?.toString()
    );

    for (const file of childFiles) {
      const filePath = path.join(dirPath, file.name);
      try {
        if (/\.(png|jpg|jpeg|pdf|svg)$/.test(file.name.toLowerCase())) {
          fs.writeFileSync(filePath, file.blobId.content); // binary
        } else {
          fs.writeFileSync(filePath, file.blobId.content.toString()); // text
        }
      } catch (fileErr) {
        throw fileErr; // rethrow so main route catches
      }
    }
  } catch (err) {
    throw err; // propagate up to route handler
  }
}

// Compile LaTeX project route
router.post("/compile/:id", authenticateJWT, async (req, res) => {
  let tmpDir;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const folders = await Folder.find({ project: project._id });
    const files = await File.find({ project: project._id }).populate("blobId");

    tmpDir = await tmp.dir({ unsafeCleanup: true });
    const tempPath = tmpDir.path;

    await writeProjectToTemp(tempPath, folders, files, project.rootFolder);

    const mainFile = files.find(
      (f) => f._id.toString() === project.rootFile.toString()
    );
    if (!mainFile)
      return res.status(404).json({ error: "Main file not found" });

    const mainFilePath = path.join(tempPath, mainFile.name);

    try {
      await execPromise(`tectonic "${mainFilePath}" --outdir="${tempPath}"`);
    } catch (compileErr) {
      const errorMessage =
        compileErr.stderr || compileErr.stdout || compileErr.message;

      return res.send(errorMessage);
    }

    const pdfPath = path.join(tempPath, mainFile.name.replace(".tex", ".pdf"));

    if (!fs.existsSync(pdfPath)) {
      return res.status(500).json({ error: "PDF not generated" });
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Server error",
    });
  } finally {
    if (tmpDir) {
      try {
        tmpDir.cleanup();
      } catch (cleanupErr) {
        console.error("⚠️ Cleanup failed:", cleanupErr);
      }
    }
  }
});

// Compile LaTeX project route
/* router.post("/compile/:id", authenticateJWT, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    console.log("Loading......");
    // Fetch all project files and folders
    const folders = await Folder.find({ project: project._id });
    const files = await File.find({ project: project._id }).populate("blobId");

    // Create a temporary folder
    const tmpDir = await tmp.dir({ unsafeCleanup: true });
    const tempPath = tmpDir.path;

    // Write all files and folders recursively
    await writeProjectToTemp(tempPath, folders, files, project.rootFolder);

    console.log("3");
    // Compile the main file (main.tex)
    const mainFile = files.find(
      (f) => f._id.toString() === project.rootFile.toString()
    );
    console.log("4");
    if (!mainFile)
      return res.status(404).json({ error: "Main file not found" });

    const mainFilePath = path.join(tempPath, mainFile.name);
    console.log("5");
    await execPromise(`tectonic "${mainFilePath}" --outdir="${tempPath}"`);
    console.log("6");

    const pdfPath = path.join(tempPath, mainFile.name.replace(".tex", ".pdf"));
    console.log("7");
    const pdfBuffer = fs.readFileSync(pdfPath);
    console.log("8");

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
    console.log(pdfBuffer);
    // Clean up temp folder
    tmpDir.cleanup();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.stderr || "Compilation failed" });
  }
}); */

const texTemplate = `
\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\title{My New Project}
\\author{Author Name}
\\date{\\today}

\\begin{document}

\\maketitle

Hello, world! This is a LaTeX File, Created Later.

\\end{document}
`;

// GetFile
router.get("/loadEditor/:id", authenticateJWT, async (req, res) => {
  try {
    const projects = await Project.findById(req.params.id);

    if (req.user.id.toString() !== projects.owner.toString()) {
      return res.status(403).json({ error: "You are not the owner" });
    }
    const Folders = await Folder.find({
      parent: projects.rootFolder.toString(),
    });
    const Files = await File.find({
      parent: projects.rootFolder.toString(),
    });
    const rootFile = await File.findById(projects.rootFile.toString()).populate(
      "blobId"
    );
    res.json({
      fileContent: rootFile.blobId.content.toString(),
      Folders,
      Files,
      rootFile,
      rootFolder: projects.rootFolder.toString(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GetFolder
router.get("/getfolder/:id", authenticateJWT, async (req, res) => {
  try {
    const { folderID } = req.query;
    const Folders = await Folder.find({
      parent: folderID,
    });
    const Files = await File.find({
      parent: folderID,
    });
    const parentFolder = await Folder.findById(folderID);
    res.json({ Folders, Files, parentId: parentFolder.parent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GetFile
router.get("/getfile/:id", authenticateJWT, async (req, res) => {
  try {
    const { fileID } = req.query;
    const file = await File.findById(fileID).populate("blobId");

    res.json({ fileContent: file.blobId.content.toString() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload Image to a folder
router.post(
  "/uploadimage/:id",
  authenticateJWT,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.user)
        return res.status(400).json({ message: "Authentication issue" });

      const { currFolder } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ message: "No file uploaded" });

      // Create hash for deduplication
      const hash = crypto.createHash("sha1").update(file.buffer).digest("hex");

      // Check if the blob already exists
      let blob = await Blob.findOne({ hash });
      if (!blob) {
        blob = await Blob.create({
          hash,
          content: file.buffer,
          mime: file.mimetype,
          isBinary: true,
        });
      }

      // Create File document
      const newFile = new File({
        name: file.originalname,
        parent: currFolder,
        owner: req.user._id,
        project: req.params.id,
        blobId: blob._id,
        isBinary: true,
      });
      await Blob.findByIdAndUpdate(blob._id, {
        $addToSet: { filesIDs: newFile._id }, // 🔹 add only if not already present
      });
      await newFile.save();

      // Return updated file list
      const Files = await File.find({ parent: currFolder });
      res.json({ message: "Image uploaded successfully", Files });
    } catch (err) {
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// Example: Create a new file
router.post("/newfile/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }
  try {
    let { currFolder, filename } = req.body;
    const hash = crypto.createHash("sha1").update(texTemplate).digest("hex");
    // Check if the file already exists
    let blob = await Blob.findOne({ hash });
    if (!blob) {
      blob = await Blob.create({
        hash,
        content: Buffer.from(texTemplate, "utf-8"),
        mime: "application/x-tex",
      });
    } else {
      console.log("File already exists in database:", hash);
    }
    const newFile = new File({
      name: filename,
      parent: currFolder,
      owner: req.user._id,
      project: req.params.id,
      blobId: blob._id,
      isBinary: false,
    });

    await newFile.save();
    await Blob.findByIdAndUpdate(blob._id, {
      $addToSet: { filesIDs: newFile._id },
    });
    const Files = await File.find({
      parent: currFolder,
    });
    res.json({ message: "Succces", Files });
  } catch (err) {
    res.status(400).json({ message: "Different error" });
  }
});

// Example: Create a new folder
router.post("/newfolder/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }
  const { currFolder, foldername } = req.body;
  try {
    const newFolder = new Folder({
      name: foldername,
      parent: currFolder,
      owner: req.user._id,
      project: req.params.id,
    });
    await newFolder.save();
    const Folders = await Folder.find({
      parent: currFolder,
    });
    res.json({ message: "Succces", Folders });
  } catch (err) {
    res.status(400).json({ message: "Different error" });
  }
});

// Example: Get all projects from ProjectView
router.get("/view/:id", authenticateJWT, async (req, res) => {
  try {
    if (!req.user) {
      res.status(500).json({ message: "Login to view" });
    }
    const projects = await Project.findById(req.params.id);

    const Folders = await Folder.find({
      parent: projects.rootFolder.toString(),
    });
    const Files = await File.find({
      parent: projects.rootFolder.toString(),
    });
    const rootFile = await File.findById(projects.rootFile.toString()).populate(
      "blobId"
    );
    res.json({
      projects,
      Folders,
      Files,
      rootFile,
      rootFolder: projects.rootFolder.toString(),
      fileContent: rootFile.blobId.content.toString(),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example: Create a new project
router.post("/create", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }
  const user = await User.findById(req.user.id).populate("project");
  if (!user.isPremium && user.project.length > 0) {
    return res.status(400).json({
      message: "premium is required for more than one project",
      requiredpremium: true,
    });
  }

  const { title, about, topics, private } = req.body;
  const foldername = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  if (req.user.projects?.includes(foldername)) {
    return res.json({ message: "Folder exist error" });
  }
  const project = new Project({
    title,
    about,
    topics,
    owner: req.user._id,
    private,
  });

  const newFolder = new Folder({
    name: foldername,
    parent: null,
    owner: req.user._id,
    project: project._id,
  });
  const hash = crypto.createHash("sha1").update(texTemplate).digest("hex");
  // Check if the file already exists
  let blob = await Blob.findOne({ hash });
  if (!blob) {
    blob = await Blob.create({
      hash,
      content: Buffer.from(texTemplate, "utf-8"),
      mime: "application/x-tex",
    });
  } else {
    console.log("File already exists in database:", hash);
  }

  const mainFile = new File({
    name: "main.tex",
    parent: newFolder._id,
    owner: req.user._id,
    project: project._id,
    blobId: blob._id,
    isBinary: false,
  });
  await Blob.findByIdAndUpdate(blob._id, {
    $addToSet: { filesIDs: mainFile._id },
  });
  await mainFile.save();

  await newFolder.save();

  // link root folder id to project
  project.rootFile = mainFile._id;
  project.rootFolder = newFolder._id;
  await project.save();

  await User.findByIdAndUpdate(
    req.user._id,
    { $push: { project: project._id } } // add project id
  );
  res.status(201).json({ id: project._id, foldername });
});

router.post("/savefile/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }

  const { currfile, latex } = req.body;

  try {
    // Fetch the file first
    const file = await File.findById(currfile);
    if (req.user.id.toString() !== file.owner.toString()) {
      return res.status(400).json({ message: "Authentication issue" });
    }

    if (!file) return res.status(404).json({ message: "File not found" });

    const hash = crypto.createHash("sha1").update(latex).digest("hex");

    const oldBlobId = file.blobId;

    // Find or create the new blob
    let blob = await Blob.findOne({ hash });
    if (!blob) {
      blob = await Blob.create({
        hash,
        content: Buffer.from(latex, "utf-8"),
        mime: "application/x-tex",
        filesIDs: [currfile],
      });
    } else {
      // Add current file ID if not already present
      await Blob.findByIdAndUpdate(blob._id, {
        $addToSet: { filesIDs: currfile }, // add only if not exists
      });
    }

    // Update file with new blob
    file.blobId = blob._id;
    await file.save();

    // Handle old blob cleanup
    // Handle old blob cleanup
    if (oldBlobId && oldBlobId.toString() !== blob._id.toString()) {
      const oldBlob = await Blob.findById(oldBlobId);
      if (oldBlob) {
        // Ensure filesIDs is an array
        const updatedOldBlob = await Blob.findByIdAndUpdate(
          oldBlobId,
          { $pull: { filesIDs: currfile } },
          { new: true }
        );

        if (
          (!updatedOldBlob.filesIDs || updatedOldBlob.filesIDs.length === 0) &&
          (!updatedOldBlob.commitIDs || updatedOldBlob.commitIDs.length === 0)
        ) {
          await Blob.findByIdAndDelete(oldBlobId);
        } else {
          await oldBlob.save();
        }
      }
    }

    res.json({ message: "File saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete File
router.post("/deleteFile/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }

  const { fileID } = req.body;

  try {
    // 1. Find the file
    const file = await File.findById(fileID);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const blobId = file.blobId;
    const folderId = file.parent;

    // 2. Delete the file first
    await File.findByIdAndDelete(fileID);

    // 3. Remove file reference from blob and return updated blob
    const updatedBlob = await Blob.findByIdAndUpdate(
      blobId,
      { $pull: { filesIDs: fileID } },
      { new: true } // returns updated doc
    );

    if (!updatedBlob) {
      return res.json({ message: "File deleted, but blob not found" });
    }

    // 4. If blob has no files and no commits, delete it
    if (
      (!updatedBlob.filesIDs || updatedBlob.filesIDs.length === 0) &&
      (!updatedBlob.commitIDs || updatedBlob.commitIDs.length === 0)
    ) {
      await Blob.findByIdAndDelete(blobId);
    } else {
      console.log("Blob updated, file removed:", blobId);
    }
    const Files = await File.find({
      parent: folderId,
    });
    res.json({ message: "File deleted successfully", Files });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/fork/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(500).json({ message: "Login To Continue" });
  }

  const user = await User.findById(req.user.id).populate("project");
  if (!user.isPremium && user.project.length > 0) {
    return res.status(400).json({
      message: "premium is required for more than one project",
      requiredpremium: true,
    });
  }
  const project = await Project.findById(req.params.id)
    .populate("rootFolder")
    .populate("rootFile");

  const Forkproject = new Project({
    title: project.title,
    about: project.about,
    topics: project.topics,
    owner: req.user._id,
    private: project.private,
  });

  const rootFolder = new Folder({
    name: project.rootFolder.name,
    parent: null,
    owner: req.user._id,
    project: Forkproject._id,
  });

  const mainFile = new File({
    name: "main.tex",
    parent: rootFolder._id,
    owner: req.user._id,
    project: Forkproject._id,
    blobId: project.rootFile.blobId,
    isBinary: false,
  });

  await Blob.findByIdAndUpdate(project.rootFile.blobId, {
    $addToSet: { filesIDs: mainFile._id },
  });
  await mainFile.save();
  await rootFolder.save();

  // link root folder + file to new project
  Forkproject.rootFile = mainFile._id;
  Forkproject.rootFolder = rootFolder._id;
  await Forkproject.save();

  // 4️⃣ Copy folders & files
  const oldFolders = await Folder.find({ project: req.params.id }).lean();
  const oldFiles = await File.find({ project: req.params.id }).lean();

  // Mapping old → new folder ids
  const folderIdMap = new Map();
  folderIdMap.set(project.rootFolder._id.toString(), rootFolder._id.toString());

  // Create new folders (with parent = null for now)
  for (const folder of oldFolders) {
    // skip root (already created)
    if (folder._id.toString() === project.rootFolder._id.toString()) continue;

    const newFolder = await Folder.create({
      name: folder.name,
      parent: null, // fix later
      owner: req.user._id,
      project: Forkproject._id,
    });

    folderIdMap.set(folder._id.toString(), newFolder._id.toString());
  }

  // Fix parents using the map
  for (const folder of oldFolders) {
    if (!folder.parent) continue;
    const newFolderId = folderIdMap.get(folder._id.toString());
    const newParentId = folderIdMap.get(folder.parent.toString());

    await Folder.findByIdAndUpdate(newFolderId, { parent: newParentId });
  }

  // Copy files (excluding main.tex which we already created)
  for (const file of oldFiles) {
    if (file._id.toString() === project.rootFile._id.toString()) continue;

    const newFile = await File.create({
      name: file.name,
      parent: file.parent ? folderIdMap.get(file.parent.toString()) : null,
      owner: req.user._id,
      project: Forkproject._id,
      blobId: file.blobId,
      isBinary: file.isBinary,
    });

    await Blob.findByIdAndUpdate(file.blobId, {
      $addToSet: { filesIDs: newFile._id },
    });
  }

  return res.json({ ForkprojectId: Forkproject._id });
});

module.exports = router; // export the router
