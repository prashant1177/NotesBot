const { authenticateJWT } = require("../middleware/middleware");
const Blob = require("../models/Blob");
const Commit = require("../models/Commit");
const File = require("../models/File");
const Project = require("../models/Project");

const express = require("express");
const router = express.Router();

router.get("/commit/:projectId", authenticateJWT, async (req, res) => {
  const { projectId } = req.params;
  try {
    const commits = await Commit.find({
      project: projectId,
      owner: req.user.id,
    });
    console.log(commits);
    res.json({ message: "Internal server error", commits });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Commit
router.post("/commit/:projectId", authenticateJWT, async (req, res) => {
  const { projectId } = req.params;
  const { message } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Get all files of the project
    const files = await File.find({ project: projectId });

    const changedFiles = [];

    for (const file of files) {
      const blob = await Blob.findById(file.blobId);

      if (!blob) continue;

      // 🔑 Check if this blob was already committed in this project
      // If yes → skip
      if (blob.commitIDs && blob.commitIDs.includes(projectId)) {
        continue;
      }

      // Otherwise, add it to this commit
      changedFiles.push({ file: file._id, blob: file.blobId });

      // Add commit reference to blob (atomic)
      await Blob.findByIdAndUpdate(file.blobId, {
        $addToSet: { commitIDs: projectId },
        $currentDate: { updatedAt: true },
      });
    }

    if (changedFiles.length === 0) {
      return res.status(200).json({ message: "No changes to commit" });
    }

    // Create new commit
    const newCommit = await Commit.create({
      project: projectId,
      owner: req.user._id,
      message,
      filesDiff: changedFiles,
      createdAt: new Date(),
    });

    console.log("New commit created:", newCommit._id);

    // Maintain only last 5 commits
    const commits = await Commit.find({ project: projectId }).sort({
      createdAt: 1,
    }); // oldest first

    if (commits.length > 5) {
      const commitToDelete = commits[0];

      // Remove commit references from blobs
      for (const f of commitToDelete.filesDiff) {
        const blob = await Blob.findById(f.blob);
        if (blob) {
          const updatedBlob = await Blob.findByIdAndUpdate(
            blob._id,
            { $pull: { commitIDs: commitToDelete._id } },
            { new: true }
          );

          if (
            (!updatedBlob.filesIDs || updatedBlob.filesIDs.length === 0) &&
            (!updatedBlob.commitIDs || updatedBlob.commitIDs.length === 0)
          ) {
            await Blob.findByIdAndDelete(blob._id);
            console.log("Deleted blob:", blob._id);
          }
        }
      }

      await Commit.findByIdAndDelete(commitToDelete._id);
      console.log("Deleted oldest commit:", commitToDelete._id);
    }

    res.json({
      message: "Commit created successfully",
      commitId: newCommit._id,
    });

});


module.exports = router; // export the router
