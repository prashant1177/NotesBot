require("dotenv").config(); // Load .env file variables

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
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

      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ msg: "Server error" });
    }
  });
}

async function checkPremium(req, res, next) {
  try {
    if (!req.user || !req.user?.isPremium) {
      return res.status(403).json({
        message: "Premium required to access this route",
        PremiumExpired: true,
      });
    }

    next(); // ✅ allow access
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const checkReviews = (req, res, next) => {
  if (!req.user) return res.status(400).send("Login to continue");
  if (req.user.reviewsAvailable < 1)
    return res.status(403).send("No More Reviews Left");
  next();
};
module.exports = { authenticateJWT, checkPremium, checkReviews };
