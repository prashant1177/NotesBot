const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  about: String,
  content: String,
  reference: [
    {
      title: { type: String, required: true },
      details: { type: String },
      link: { type: String },
    },
  ],
  privatMark: Boolean,
  views: Number,
  like: {
    type: [String], // 👈 this makes it an array of strings
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the User model
});

module.exports = mongoose.model("Note", noteSchema);
