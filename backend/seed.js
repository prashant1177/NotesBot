const Note = require("./models/note.js");
const mongoose = require("mongoose");

database()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function database() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/writingnotes`);
}

async function deleteAllNotes() {
  try {
    const result = await Note.deleteMany({});
    console.log(`${result.deletedCount} notes deleted.`);
  } catch (err) {
    console.error("Error deleting notes:", err);
  }
}

deleteAllNotes();
