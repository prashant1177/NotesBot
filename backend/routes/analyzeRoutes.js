require("dotenv").config(); // Load .env file variables
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { analyzePDF, Prompt } = require("../utils/analyze");

const { GoogleGenAI } = require("@google/genai");
const User = require("../models/User");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
  if (!req.user) return res.status(400).send("Login to continue");
  if (req.user.reviewsAvailable > 0) return res.status(400).send("No More Reviews Left");
  if (!req.file) return res.status(400).send("No file uploaded.");

  const filePath = req.file.path;
  try {
    const stats = await analyzePDF(filePath);

    // Read file correctly
    const contents = [
      { text: Prompt },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
        },
      },
    ];
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    if (response) {
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { reviewsAvailable: -1 },
      });
    }
    res.json({ stats, response: response.text });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.use("/uploads", express.static(uploadFolder));

module.exports = router;
