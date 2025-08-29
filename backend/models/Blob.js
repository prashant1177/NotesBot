const mongoose = require("mongoose");

const blobSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true, // SHA1/SHA256 for content integrity
  },
  content: {
    type: Buffer, // binary/text data
    required: true,
  },
  mime: {
    type: String, // "text/plain", "image/png", etc.
    required: true,
  },
  isBinary: {
    type: Boolean,
    default: false, // true for images/binaries, false for text
  },
  filesIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File", // files currently referencing this blob
    },
  ],
  commitIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Commit" }], // commits that reference this blob

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blob", blobSchema);
