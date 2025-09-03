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

const allowedOrigins = [
  "https://latexwriter.com",
  "https://www.latexwriter.com",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Reject requests with no Origin header (like Postman)
      if (!origin) {
        return callback(new Error("CORS not allowed: missing Origin"), false);
      }
      const normalizedOrigin = origin.replace(/\/$/, '');
      const normalizedAllowedOrigins = allowedOrigins.map(o => o.replace(/\/$/, ''));

      if (normalizedAllowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS not allowed for origin: ${origin}`), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin'
    ],
    optionsSuccessStatus: 200 // no trailing comma needed
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

app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  console.log("Server running on port 8080");
});
