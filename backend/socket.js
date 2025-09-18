const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Project = require("./models/Project");
const File = require("./models/File");
const Blob = require("./models/Blob.js");
const JWT_SECRET = "thisismyJWTsectetkeyyeahhhh"; // ⚠️ store in .env in production

module.exports = (io) => {
  // Auth middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.user = decoded;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.user.id);

    // Join a project room
    socket.on("connect-to-project", async (projectid) => {
       projectid = projectid.toString(); // normalize
  socket.join(projectid);
  socket.project = projectid;
      console.log(`User ${socket.user.id} joined project ${projectid}`);
    });

    // File edit event
    socket.on("edit-file", async ({ currfile, latex }) => {
         try {
        const file = await File.findById(currfile);
        if (!file) {
          socket.emit("error", { message: "File not found" });
          return;
        }

        // optional ownership check (only if your File has an `owner` field)
        if (file.owner && file.owner.toString() !== socket.user.id.toString()) {
          socket.emit("error", { message: "Not authorized to edit this file" });
          return;
        }

        const hash = crypto.createHash("sha1").update(latex).digest("hex");
        const oldBlobId = file.blobId;

        // 🔹 Find or create blob
        let blob = await Blob.findOne({ hash });
        if (!blob) {
          blob = await Blob.create({
            hash,
            content: Buffer.from(latex, "utf-8"),
            mime: "application/x-tex",
            filesIDs: [currfile],
          });
        } else {
          await Blob.findByIdAndUpdate(blob._id, {
            $addToSet: { filesIDs: currfile },
          });
        }

        // 🔹 Update file
        file.blobId = blob._id;
        await file.save();

        // 🔹 Cleanup old blob
        if (oldBlobId && oldBlobId.toString() !== blob._id.toString()) {
          const updatedOldBlob = await Blob.findByIdAndUpdate(
            oldBlobId,
            { $pull: { filesIDs: currfile } },
            { new: true }
          );

          if (
            (!updatedOldBlob.filesIDs || updatedOldBlob.filesIDs.length === 0) &&
            (!updatedOldBlob.commitIDs || updatedOldBlob.commitIDs.length === 0)
          ) {
            await Blob.findByIdAndDelete(oldBlobId);
          }
        }

        // 🔹 Broadcast to everyone in this project
       io.to(socket.project).emit("file-updated", { currfile, latex });

      } catch (error) {
        console.error("❌ Error editing file:", error);
        socket.emit("error", { message: "Server error while editing file" });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.user.id);
    });
  });
};