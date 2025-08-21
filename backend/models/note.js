const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  about: String,
  content: String,
  privatMark: Boolean,
  views: Number,
  like: Number,
  dislike: Number,
});

module.exports = mongoose.model("Note", noteSchema);;
