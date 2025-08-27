const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  }, // parent folder
  foldersInside: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  filesInside: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }], // store filenames like ["image.jpg", "doc.tex"]
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  path: { type: String },
  // related roject name  && store ath
});

module.exports = mongoose.model("Folder", folderSchema);
