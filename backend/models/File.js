const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  blobId: { type: mongoose.Schema.Types.ObjectId, ref: "Blob", required: true },
  isBinary: { type: Boolean, default: false }, // true for images, false for text
});

module.exports = mongoose.model("File", fileSchema);
