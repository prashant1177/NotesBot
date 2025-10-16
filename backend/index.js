require("dotenv").config(); // Load .env file variables
const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("./models/User.js");
const projectRoutes = require("./routes/projectRoutes");
const versionsRoutes = require("./routes/versionsRoutes");
const premiumRoutes = require("./routes/premiumRoutes");
const session = require("express-session");
const configurePassport = require("./config/passport.js");
const { authenticateJWT, checkPremium } = require("./middleware/middleware.js");
const JWT_SECRET = process.env.JWT_SECRET; // ⚠️ store in .env in production
const path = require("path");
const { Server } = require("socket.io");
const http = require("http"); // Add this at the top

const sendOtpEmail = require("./utils/sendEmail");
const { generateOtpToken, verifyOtpToken } = require("./utils/generateOtp");

//Latex
const Project = require("./models/Project.js");

app.use(express.json({ limit: "2mb" }));

const allowedOrigins = [
  "https://latexwriter.com",
  "https://www.latexwriter.com",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
];

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(
  cors({
    origin: function (origin, callback) {
      // Reject requests with no Origin header (like Postman)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");
      const normalizedAllowedOrigins = allowedOrigins.map((o) =>
        o.replace(/\/$/, "")
      );

      if (normalizedAllowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS not allowed for origin: ${origin}`), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
    optionsSuccessStatus: 200, // no trailing comma needed
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

app.use("/projects", authenticateJWT, checkPremium, projectRoutes); // all routes start with /api/projects
app.use("/versions", authenticateJWT, checkPremium, versionsRoutes); // all routes start with /api/projects
app.use("/api", premiumRoutes); // all routes start with /api/projects
require("./socket")(io);

app.get("/download/windows", (req, res) => {
  const file = path.join(__dirname, "installer", "LatexWriter-Setup-2.0.0.exe");
  res.download(file, "LatexWriter-Setup-2.0.0.exe");
});

app.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user && user.isVerified)
      return res.status(400).json({ msg: "User already exists" });

    if (!user) {
      user = new User({
        fullname,
        email,
        username: email.split("@")[0],
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
  const FREE_TRIAL_DAYS = 7;
  const now = new Date();
  user.isPremium = true;
  user.premiumExpiry = new Date(now.setDate(now.getDate() + FREE_TRIAL_DAYS));

  await user.save();

  res.send("Email verified successfully!");
});

app.post("/login", async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({ msg: info?.message || "Login failed" });
      }
      if (!user.isVerified) {
        const email = user.email;
        const { otp, token } = generateOtpToken(email);
        await sendOtpEmail(email, otp);

        return res.json({
          msg: "OTP sent to email",
          token,
          verficationNeeded: true,
        });
      }
      const token = jwt.sign({ id: user.id }, JWT_SECRET);
      return res.json({ token, username: user.fullname });
    }
  )(req, res, next);
});

// set assword
app.post("/set-password", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res.message("No user found ");
  }
  const { password } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found in DB" });
  }

  const now = new Date();
  premiumExpiry = new Date(now.setDate(now.getDate() + 7));

  user.password = password;
  user.isPremium = true;
  user.premiumExpiry = premiumExpiry;

  await user.save();

  return res.json("Success");
});

// Route to handle Google OAuth
app.post("/auth/google", async (req, res) => {
  const { tokenId } = req.body; // frontend sends Google ID token

  // Verify token with Google
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        googleId: payload.sub,
        email: payload.email,
        fullname: payload.name,
        username: payload.email.split("@")[0],
        isVerified: true, // Google emails are verified already
      });
    }
    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    if (!user.password) {
      return res.json({ token, username: user.fullname, setpassword: true });
    }
    res.json({ token, username: user.fullname });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid Google token" });
  }
});

// user get Details
app.get("/user", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.json({ user });
  } catch (error) {
    return res.json({ message: "User login in first" });
  }
});

// user update Details
app.put("/user", authenticateJWT, async (req, res) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ error: "Authentication error: you cannot edit this note" });
  }
  const { fullname, userabout } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { fullname, userabout },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User Details updated" });
});

app.get("/MyProject", authenticateJWT, async (req, res) => {
  const projects = await Project.find({
    $or: [{ owner: req.user.id }, { editors: req.user.id }],
  }).populate("owner").sort({
    createdAt: -1,
  });
  res.json({ projects, author: req.user });
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

server.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  console.log("Server running on port 8080");
});
