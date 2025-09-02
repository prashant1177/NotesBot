require("dotenv").config(); // Load .env file variables

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("./models/User.js");
const Note = require("./models/note.js");
const projectRoutes = require("./routes/projectRoutes");
const versionsRoutes = require("./routes/versionsRoutes");
const premiumRoutes = require("./routes/premiumRoutes");
const session = require("express-session");
const configurePassport = require("./config/passport.js");
const { authenticateJWT, viewCount } = require("./middleware/middleware.js");
const JWT_SECRET = process.env.JWT_SECRET; // ⚠️ store in .env in production

const sendOtpEmail = require("./utils/sendEmail");
const { generateOtpToken, verifyOtpToken } = require("./utils/generateOtp");

//Latex

const { exec } = require("child_process");
const tmp = require("tmp");
const fs = require("fs");
const Project = require("./models/Project.js");

app.use(express.json({ limit: "2mb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["https://latexwriter.com"],
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

app.use("/projects", projectRoutes); // all routes start with /api/projects
app.use("/versions", versionsRoutes); // all routes start with /api/projects
app.use("/api", premiumRoutes); // all routes start with /api/projects

// API to compile LaTeX using Tectonic
app.post("/compile", (req, res) => {
  const { content } = req.body;

  // create temporary directory
  tmp.dir({ unsafeCleanup: true }, (err, dirPath, cleanup) => {
    if (err) return res.status(500).send("Temp dir error");

    const texPath = `${dirPath}/document.tex`;
    const pdfPath = `${dirPath}/document.pdf`;

    fs.writeFileSync(texPath, content);

    // compile with Tectonic
    exec(
      `tectonic "${texPath}" --outdir="${dirPath}"`,
      (err, stdout, stderr) => {
        if (err) return res.status(500).send(stderr);

        const pdfBuffer = fs.readFileSync(pdfPath);
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);

        cleanup(); // delete temp files
      }
    );
  });
});

app.post("/register", async (req, res) => {
  const { fullname, email, username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    let emailcheck = await User.findOne({ email });
    if ((user || emailcheck) && (user.isVerified || emailcheck.isVerified))
      return res.status(400).json({ msg: "User already exists" });

    if (!user && !emailcheck) {
      user = new User({
        fullname,
        email,
        username,
        userabout: "",
        password,
      });

      await user.save();
    }
    
    const { otp, token } = generateOtpToken(email);
    await sendOtpEmail(email, otp);

    res.json({ msg: "OTP sent to email", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});
app.post("/verify-otp", async (req, res) => {
  const { token, otp } = req.body;

  const isValid = verifyOtpToken(token, otp);
  if (!isValid) return res.status(400).send("Invalid or expired OTP");

  const payload = jwt.decode(token);
  const user = await User.findOne({ email: payload.email });
  if (!user) return res.status(404).send("User not found");

  user.isVerified = true;
  await user.save();

  res.send("Email verified successfully!");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user)
      return res.status(400).json({ msg: info?.message || "Login failed" });

    // Issue JWT
    const token = jwt.sign(
      { id: user.id, username: user.fullname },
      JWT_SECRET
    );
    return res.json({ token });
  })(req, res, next);
});

app.get("/searchnotes", async (req, res) => {
  try {
    const { search, sort = "recent" } = req.query;

    let query = {};

    // 🔎 Search filter
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } }, // case-insensitive partial match
          { about: { $regex: search, $options: "i" } },
          { topics: { $regex: search, $options: "i" } },
        ],
      };
    }

    // 📊 Sorting (always descending)
    let sortOption = {};
    if (sort === "views") {
      sortOption = { views: -1 };
    } else {
      sortOption = { createdAt: -1 }; // default: most recent
    }

    const notes = await Note.find(query).sort(sortOption);

    res.json({ notes });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// user get Details
app.get("/user", authenticateJWT, async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user.id);
    res.json({ user });
    return;
  }
  return res.err({ message: "User login in first" });
});

// user update Details
app.put("/user", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ error: "Authentication error: you cannot edit this note" });
  }
  const { fullname, email, username, userabout } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { fullname, email, username, userabout },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

app.get("/MyProject", authenticateJWT, async (req, res) => {
  const projects = await Project.find({ owner: req.user.id });
  const author = await User.findById(req.user.id);
  res.json({ projects, author });
});

//Get author details
app.get("/userdetails", authenticateJWT, async (req, res) => {
  const author = await User.findById(req.user.id);
  res.json({ author });
});

//Get author details
app.get("/profile/:username", authenticateJWT, async (req, res) => {
  let author = await User.findOne({
    username: req.params.username.toLowerCase(),
  });
  if (!author) {
    author = await User.findById(req.user.id);
  }
  const projects = await Project.find({ owner: author._id }).sort({
    createdAt: -1,
  });

  res.json({ author, projects });
});

app.get("/openeditor/:id", authenticateJWT, async (req, res) => {
  const projects = await Project.findById(req.params.id);
  if (projects.owner.toString() == req.user.id) {
    return res.json({ message: "Success" });
  } else {
    return res.status(404).json({ error: "You are not the owner" });
  }
});

app.put("/like/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ error: "Login error: Login to like this" });
  }
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
});

// Follow
app.put("/follow/:id", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ error: "Login error: You need to login to follow" });
  }

  if (req.user.following?.includes(req.params.id.toString())) {
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { followers: req.user._id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { following: req.params.id } },
      { new: true }
    );

    res.json({ message: "Unfollow success" });
    return;
  }
  await User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { followers: req.user._id } },
    { new: true }
  );

  await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { following: req.params.id } },
    { new: true }
  );

  res.json({ message: "Following success" });
});
app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  console.log("Server running on port 8080");
});
