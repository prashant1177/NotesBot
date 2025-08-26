// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { createProject,openFile } = require("../Database/DataBase");
const { authenticateJWT } = require("../middleware/middleware.js");
const Folder = require("../models/Folder.js");
const File = require("../models/File.js");

// GetFile
router.get("/getfile/:id", authenticateJWT, async (req, res) => {
  try {
    const { path, fileName } = req.query;
    const projects = await Project.findById(req.params.id);
    const fileContent = await openFile("/" + req.user.username + "/" + path+ "/" + fileName);
    console.log("/" + req.user.username + "/" + path + "/" + fileName)
    res.json({ fileContent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example: Get all projects
router.get("/view/:id", authenticateJWT, async (req, res) => {
  try {
    const projects = await Project.findById(req.params.id);
    const rootFile = await Folder.findOne({
      owner: req.user._id,
      name: projects.folderName,
    });
    res.json({ projects, rootFile });
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

  const project = new Project({
    title,
    about,
    topics,
    owner: req.user._id,
    private,
    folderName: foldername,
  });

  const mainFile = new File({
    name: "main.tex",
    parent: foldername,
    owner: req.user._id,
  });

  const mainFileData = await mainFile.save();

  const newFolder = new Folder({
    name: foldername,
    parent: null,
    foldersInside: [],
    filesInside: mainFileData.name,
    owner: req.user._id,
  });

  await newFolder.save();

  try {
    const newProject = await project.save();
    createProject(req.user.username, foldername);
    res.status(201).json({ id: newProject._id });
  } catch (err) {
    res.status(400).json({ message: "Different error" });
  }
});

module.exports = router; // export the router
