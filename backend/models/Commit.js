const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  filesDiff: [
    {
      fileName: String,
      fileParent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Folder",
          required: true,
        },
      file: { type: mongoose.Schema.Types.ObjectId, ref: "File", required: true },
      blob: { type: mongoose.Schema.Types.ObjectId, ref: "Blob", required: true },
    }
  ],
});


module.exports = mongoose.model("Commit", commitSchema);
