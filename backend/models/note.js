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
  topics: { type: [String], required: true },
  privatMark: Boolean,
  views: Number,
  like: {
    type: [String], 
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the User model
});

module.exports = mongoose.model("Note", noteSchema);


// Content version logic
//  A add on user can have 100 version of notes saved as saveoints
// a free user can have last 10
// a pro user can buy version control after 100 version at base price that we pay to mongodb

// pro user after hitting more bills
// Only enable paid services after getting first bill
// College students will get free versions
// A note creator can, have super owner who can edit owners and only he can delete the note 
// A note will have team || Respect the names 
// Respect the contributors