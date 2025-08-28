// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { ObjectId } = require("mongoose").Types;

const Project = require("../models/Project");
const {
  createProject,
  openFile,
  createFile,
  createFolder,
  saveFile,
} = require("../Database/DataBase");
const { authenticateJWT } = require("../middleware/middleware.js");
const Folder = require("../models/Folder.js");
const File = require("../models/File.js");
const User = require("../models/User.js");
const Blob = require("../models/Blob.js");

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
    res.json({ Folders, Files });
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

// Example: Create a new file
router.post("/newfile/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }
  try {
    let { currFolder, filename } = req.body;

    if (!filename.toLowerCase().endsWith(".tex")) {
      filename += ".tex";
    }

    const newFile = new File({
      name: filename,
      parent: currFolder,
      owner: req.user._id,
      project: req.params.id,
      blobId: "68b04aa931426fa1bed3eaf2",
      isBinary: false,
    });

    await newFile.save();

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

// Example: Create a new folder
router.post("/savefile/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }
  const { currfile, latex } = req.body;
  try {
    const hash = crypto.createHash("sha1").update(latex).digest("hex");
    // Check if the file already exists
    let blob = await Blob.findOne({ hash });
    if (!blob) {
      blob = await Blob.create({
        hash,
        content: Buffer.from(latex, "utf-8"),
        mime: "application/x-tex",
      });

  await File.findByIdAndUpdate(currfile, { blobId: blob._id});
      
    } else {
      console.log("File already exists in database:", hash);
    }
    res.json({ message: "Succces" });
  } catch (err) {
    res.status(400).json({ message: "Different error" });
  }
});

module.exports = router; // export the router

/* const file = new File({
      name: filename,
      parent: currentPath,
      owner: req.user._id,
    });

    await file.save(); */
