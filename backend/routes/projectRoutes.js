// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
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

// GetFile
router.get("/loadEditor/:id", authenticateJWT, async (req, res) => {
  try {
    const projects = await Project.findById(req.params.id);

   if (req.user.id.toString() !== projects.owner.toString()) {
  return res.status(403).json({ error: "You are not the owner" });
}
    const rootFolder = await Folder.findById(projects.rootFolder._id).populate([
      "foldersInside",
      "filesInside",
    ]);

    const fileContent = await openFile(
      "/" + req.user.username + "/" + rootFolder.name + "/main.tex"
    );
    res.json({ fileContent, rootFolder, rootFile: projects.rootFile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GetFolder
router.get("/getfolder/:id", authenticateJWT, async (req, res) => {
  try {
    const { folderID } = req.query;
    const folder = await Folder.findById(folderID).populate([
      "foldersInside",
      "filesInside",
    ]);
    res.json({ folder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GetFile
router.get("/getfile/:id", authenticateJWT, async (req, res) => {
  try {
    const { fileID } = req.query;

    const file = await File.findById(fileID);
    const fileContent = await openFile(
      "/" + req.user.username + "/" + file.path + "/" + file.name
    );

    res.json({ fileContent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example: Create a new file
router.post("/newfile/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "Authentication issue" });
  }
  let { currFolder, filename } = req.body;
  if (!filename.toLowerCase().endsWith(".tex")) {
    filename += ".tex";
  }
  console.log(filename);
  const projects = await Project.findById(req.params.id).populate("rootFolder");
  const folder = await Folder.findById(currFolder);

  const newpath = folder.path;
  const newFile = new File({
    name: filename,
    parent: currFolder,
    owner: req.user._id,
    project: req.params.id,
    path: newpath,
  });
  try {
    createFile(req.user.username, newpath, filename);
    await newFile.save();

    folder.filesInside.push(newFile._id);
    await folder.save(); // <--- missing in your code

    res.json({ message: "Succces", folder });
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
  const folder = await Folder.findById(currFolder);
  try {
    createFolder(req.user.username, folder.path, foldername);

    const newpath = folder.path + "/" + foldername;

    const newFolder = new Folder({
      name: foldername,
      parent: currFolder,
      foldersInside: [],
      filesInside: [],
      owner: req.user._id,
      project: req.params.id,
      path: newpath,
    });
    await newFolder.save();
    folder.foldersInside.push(newFolder._id);
    await folder.save(); // <--- missing in your code
    res.json({ message: "Succces", newFolder });
  } catch (err) {
    res.status(400).json({ message: "Different error" });
  }
});

// Example: Get all projects
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

  createProject(req.user.username, foldername);
  const newFolder = new Folder({
    name: foldername,
    parent: null,
    foldersInside: [],
    filesInside: [],
    owner: req.user._id,
    project: project._id,
    path: "/" + foldername,
  });
  const mainFile = new File({
    name: "main.tex",
    parent: newFolder._id,
    owner: req.user._id,
    project: project._id,
    path: foldername,
  });

  await mainFile.save();

  newFolder.filesInside.push(mainFile._id);
  await newFolder.save(); // <--- missing in your code

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
  const { currFolder, currfile, latex } = req.body;
  const fileData = await File.findById(currfile);
  const folder = await Folder.findById(currFolder);
  try {
    saveFile(req.user.username, folder.path, fileData.name, latex);
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
