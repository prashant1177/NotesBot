const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String, // folder name
  parent: String, // parent folder
  foldersInside: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }],
  filesInside: [{ type: String }], // store filenames like ["image.jpg", "doc.tex"]
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // related roject name  && store ath 
});

module.exports = mongoose.model("Folder", folderSchema);
