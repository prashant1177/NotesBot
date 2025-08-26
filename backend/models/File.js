const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String, // folder name
  parent: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("File", fileSchema);
