require("dotenv").config(); // Load .env file variables

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note.js");

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
  })
);

database()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function database() {
  await mongoose.connect(process.env.MONGO_URL);
}


app.get("/PublicNotes", async (req, res) => {
  const notes = await Note.find({ privatMark: false });
  console.log(notes);
  res.json({ notes});
});

app.get("/PrivateNotes", async (req, res) => {
  const notes = await Note.find({ privatMark: true });
  res.json({ notes});
});

app.get("/note/:id", async (req, res) => {
  console.log("/note/:id");
  const note = await Note.findById(req.params.id);
  console.log(note);
  res.json({ note});
});

app.post("/newnote", async (req, res) => {
  const { title, about, privatMark } = req.body;
  const note = new Note({
    title: title || `Add a title here`,
    about: about || ``,
    content: `<p>Start writing from here...</p>`,
    privatMark: privatMark,
    views: 0,
    like: 0,
    dislike: 0,
  });
  await note.save();
  console.log(note.privatMark);
  res.json({ id: note._id });
});

app.get("/editor/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json({ id: note._id, title: note.title, content: note.content });
});

app.put("/editor/:id", async (req, res) => {
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true } // return updated document instead of old one
  );

  if (!updatedNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(updatedNote);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
