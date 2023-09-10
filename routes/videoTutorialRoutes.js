const express = require("express");
const router = express.Router();
const protect = require("../Middlewares/authMiddleware");
const {
  createVideoTutorial,
  getAllVideoTutorials,
  getVideoTutorialById,
  updateVideoTutorial,
  deleteVideoTutorial,
} = require("../controllers/videoTutorialController");

// Create a new video tutorial
router.post("/", createVideoTutorial);

// Get all video tutorials
router.get("/", getAllVideoTutorials);

// Get a single video tutorial by ID
router.get("/:id", getVideoTutorialById);

// Update a video tutorial by ID
router.put("/:id", updateVideoTutorial);

// Delete a video tutorial by ID
router.delete("/:id", deleteVideoTutorial);

module.exports = router;
