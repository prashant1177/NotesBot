const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const analyzePDF = require("../utils/analyze");

// Setup upload folder
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });
// Upload endpoint
router.post("/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  const filePath = req.file.path;
  try {
    const stats = await analyzePDF(filePath);
    console.log(stats);
    const fileLink = `http://localhost:3000/uploads/${req.file.filename}`;
    res.json({ stats, fileLink });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.use('/uploads', express.static(uploadFolder));

module.exports = router; // export the router
