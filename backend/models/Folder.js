const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: { type: String },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

module.exports = mongoose.model("Folder", folderSchema);
// root folder is where arent is null in query do this