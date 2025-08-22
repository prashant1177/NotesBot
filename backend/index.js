require("dotenv").config(); // Load .env file variables

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("./models/User.js");
const Note = require("./models/note.js");

const session = require("express-session");
const configurePassport = require("./config/passport.js");
const { authenticateJWT}= require("./middleware/middleware.js");
const JWT_SECRET = "yoursecretkey"; // ⚠️ store in .env in production

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "yoursecretkey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

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

app.post("/register", async (req, res) => {
  const { fullname, email, username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    let emailcheck = await User.findOne({ email });
    if (user || emailcheck)
      return res.status(400).json({ msg: "User already exists" });

    user = new User({ fullname, email, username, password });
    await user.save();
    console.log(user);
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user)
      return res.status(400).json({ msg: info?.message || "Login failed" });

    // Issue JWT
    const token = jwt.sign({ id: user.id, username: user.fullname}, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  })(req, res, next);
});

app.get("/PublicNotes", async (req, res) => {
  const notes = await Note.find({ privatMark: false });
  res.json({ notes });
});

app.get("/PrivateNotes",authenticateJWT,  async (req, res) => {
  const notes = await Note.find({ createdBy: req.user });
  res.json({ notes });
});

app.get("/note/:id", async (req, res) => {
  const note = await Note.findById(req.params.id)
    .populate("createdBy"); 
  console.log(note.createdBy.username);
  res.json({ note, createdBy:note.createdBy.username });
});

app.post("/newnote",authenticateJWT, async (req, res) => {
  const { title, about, privatMark } = req.body;
  console.log(req.user);
  const note = new Note({
    title: title || `Add a title here`,
    about: about || ``,
    content: `<p>Start writing from here...</p>`,
    privatMark: privatMark,
    views: 0,
    like: 0,
    dislike: 0,
    createdBy: req.user,
  });
  await note.save();
  console.log(note);
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
