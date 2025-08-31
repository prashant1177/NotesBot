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
        console.error(`❌ Failed writing file ${file.name}:`, fileErr);
        throw fileErr; // rethrow so main route catches
      }
    }
  } catch (err) {
    console.error("❌ Error in writeProjectToTemp:", err);
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
    if (!mainFile) return res.status(404).json({ error: "Main file not found" });

    const mainFilePath = path.join(tempPath, mainFile.name);

    try {
      await execPromise(`tectonic "${mainFilePath}" --outdir="${tempPath}"`);
    } catch (compileErr) {
      console.error("❌ Compilation failed:", compileErr);
      return res.status(500).json({
        error: compileErr.stderr?.toString() || compileErr.message || "Compilation failed",
      });
    }

    const pdfPath = path.join(tempPath, mainFile.name.replace(".tex", ".pdf"));

    if (!fs.existsSync(pdfPath)) {
      return res.status(500).json({ error: "PDF not generated" });
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);

  } catch (err) {
    console.error("❌ Unexpected error in compile route:", err);
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
router.post("/compile/:id", authenticateJWT, async (req, res) => {
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
});

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
      console.log(req.user);
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
      console.error(err);
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
    const projects = await Project.findById(req.params.id);
    const currFolder = await Folder.findById(projects.rootFolder).populate([
      "foldersInside",
      "filesInside",
    ]);
    res.json({ projects, currFolder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example: Create a new project
router.post("/create", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
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
    { $addToSet: { projects: foldername } } // add project id
  );

  res.status(201).json({ id: project._id, foldername });
});

router.post("/savefile/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }

  const { currfile, latex } = req.body;

  try {
    const hash = crypto.createHash("sha1").update(latex).digest("hex");

    // Fetch the file first
    const file = await File.findById(currfile);
    if (!file) return res.status(404).json({ message: "File not found" });

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
      console.log("New blob created id add", currfile);
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
          console.log("Old blob deleted:", oldBlobId);
        } else {
          await oldBlob.save();
          console.log("Old blob updated, one file ID removed:", oldBlobId);
        }
      }
    }

    res.json({ message: "File saved successfully" });
  } catch (err) {
    console.error(err);
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

    console.log(blobId);
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
      console.log("Blob deleted:", blobId);
    } else {
      console.log("Blob updated, file removed:", blobId);
    }
    const Files = await File.find({
      parent: folderId,
    });
    res.json({ message: "File deleted successfully", Files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router; // export the router
