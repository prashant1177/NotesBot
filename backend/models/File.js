const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },
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
  path: { type: String, default: "" },
});

module.exports = mongoose.model("File", fileSchema);
