const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  about: String,
  content: String,
  privatMark: Boolean,
  views: Number,
  like: Number,
  dislike: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
});

module.exports = mongoose.model("Note", noteSchema);
