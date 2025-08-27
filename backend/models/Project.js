const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    default: "",
  },
  topics: {
    type: [String], // array of topic strings
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  private: {
    type: Boolean,
    default: true,
  },
  rootFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  }, // 👈 Add this
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
