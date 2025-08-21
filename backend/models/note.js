const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  privatMark: Boolean,
});

module.exports = mongoose.model("Note", noteSchema);;
