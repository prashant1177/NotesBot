const mongoose = require("mongoose");

const blobSchema = new mongoose.Schema({
  hash: { type: String, required: true, unique: true }, // SHA1/SHA256
  content: { type: Buffer, required: true },            // binary/text data
  mime: { type: String, required: true },           // "text/plain", "image/png", ...
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blob", blobSchema);
