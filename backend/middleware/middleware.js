const jwt = require("jsonwebtoken");
const JWT_SECRET = "yoursecretkey"; // ⚠️ store in .env in production
const Note = require("../models/note.js");
const User = require("../models/User.js");
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next();
    return;
  }
  const token = authHeader.split(" ")[1]; // "Bearer <token>"

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    try {
      const user = await User.findById(decoded.id).select("-password"); // exclude password
      if (!user) return res.status(404).json({ msg: "User not found" });

      req.user = user; // attach to request
      next();
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  });
}
async function viewCount(req, res, next) {
  const note = await Note.findById(req.params.id);
  await Note.findByIdAndUpdate(
    req.params.id,
    { views: note.views + 1 },
    { new: true }
  );
  next();
}

module.exports = { authenticateJWT, viewCount };
