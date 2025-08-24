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
const { authenticateJWT, viewCount } = require("./middleware/middleware.js");
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
    const token = jwt.sign(
      { id: user.id, username: user.fullname },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  })(req, res, next);
});

app.get("/PublicNotes", async (req, res) => {
  const notes = await Note.find({ privatMark: false });
  res.json({ notes });
});

app.get("/PrivateNotes", authenticateJWT, async (req, res) => {
  const notes = await Note.find({ createdBy: req.user });
  res.json({ notes });
});

app.get("/AuthorNotes/:id", async (req, res) => {
  const notes = await Note.find({ createdBy: req.params.id });
  const author = await Note.findOne({ createdBy: req.params.id }).populate(
    "createdBy"
  );

  res.json({ notes, author: author.createdBy });
});

//show
app.get("/note/:id", authenticateJWT, viewCount, async (req, res) => {
  let allowEdit = false;
  const note = await Note.findById(req.params.id).populate(
    "createdBy",
    "-password"
  );
  note.like = note.like.length;
  if (!req.user) {
    res.json({ note, allowEdit });
    return;
  }
  if (req.user._id.equals(note.createdBy._id)) {
    allowEdit = true;
  }

  res.json({ note, allowEdit });
});

app.delete("/note/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ error: "Login error: Login to continue" });
  }
  const note = await Note.findById(req.params.id).populate(
    "createdBy",
    "-password"
  );

  if (req.user._id.equals(note.createdBy._id)) {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  }
  res.json({ message: "Post Not deleted successfully, You are not the owner" });
});

app.post("/newnote", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ error: "Login error: Login to continue" });
  }
  const { title, about, privatMark } = req.body;
  const note = new Note({
    title: title || `Add a title here`,
    about: about || ``,
    content: `<p>Start writing from here...</p>`,
    privatMark: privatMark,
    views: 0,
    like: [],
    createdBy: req.user,
  });
  await note.save();
  res.json({ id: note._id });
});

app.get("/editor/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ error: "Login error: you cannot edit this note" });
  }
  const note = await Note.findById(req.params.id);
  if (req.user._id.equals(note.createdBy._id)) {
    res.json({ id: note._id, title: note.title, content: note.content });
  } else {
    return res
      .status(403)
      .json({ error: "Invalid access: you cannot edit this note" });
  }
});

app.put("/editor/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ error: "Login error: you cannot edit this note" });
  }
  const note = await Note.findById(req.params.id);

  if (!req.user._id.equals(note.createdBy._id)) {
    return res
      .status(403)
      .json({ error: "Invalid access: you cannot edit this note" });
  }
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );

  if (!updatedNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(updatedNote);
});

// Like
app.put("/like/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ error: "Login error: Login to like this" });
  }
  console.log("ask to like by " + req.params.id);
  const note = await Note.findById(req.params.id);

  if (note.like.includes(req.user.username)) {
    // Unlike
    await Note.findByIdAndUpdate(
      req.params.id,
      { $pull: { like: req.user.username } },
      { new: true }
    );
    res.json({ like: note.like.length - 1, likesSate: false });
  } else {
    // Like
    await Note.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { like: req.user.username } },
      { new: true }
    );
    res.json({ like: note.like.length + 1, likesSate: true });
  }

  console.log("Like by " + note.like.length);
  console.log("Like by " + req.user.username);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
