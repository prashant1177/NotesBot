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

app.post("/newnote", async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    title: title,
    content: content,
  });
  await note.save();
  console.log(note._id);
  res.json({ id: note._id });
});
app.get("/editor/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  
  res.json({ id: note._id, title: note.title, content:note.content });
});
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
