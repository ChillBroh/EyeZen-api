const VideoTutorial = require("../models/videoTutorialModel");

// Create a new video tutorial
const createVideoTutorial = async (req, res) => {
  try {
    const { title, type, description, thumbnailUrl, videoUrl } = req.body;

    const newVideoTutorial = new VideoTutorial({
      title,
      type,
      description,
      thumbnailUrl,
      videoUrl,
    });

    await newVideoTutorial.save();
    res.status(201).json(newVideoTutorial);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all video tutorials
const getAllVideoTutorials = async (req, res) => {
  try {
    const videoTutorials = await VideoTutorial.find({});
    res.status(200).json(videoTutorials);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single video tutorial by ID
const getVideoTutorialById = async (req, res) => {
  try {
    const videoTutorial = await VideoTutorial.findById(req.params.id);
    if (!videoTutorial) {
      res.status(404).json({ error: "Video Tutorial not found" });
    } else {
      res.status(200).json(videoTutorial);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a video tutorial by ID
const updateVideoTutorial = async (req, res) => {
  try {
    const { title, type, description, thumbnailUrl, videoUrl } = req.body;
    const videoTutorial = await VideoTutorial.findById(req.params.id);

    if (!videoTutorial) {
      return res.status(404).json({ error: "Video Tutorial not found" });
    }

    const updatedFields = {
      title: title || videoTutorial.title,
      type: type || videoTutorial.type,
      description: description || videoTutorial.description,
      thumbnailUrl: thumbnailUrl || videoTutorial.thumbnailUrl,
      videoUrl: videoUrl || videoTutorial.videoUrl,
    };

    // Update the video tutorial object with the new values
    Object.assign(videoTutorial, updatedFields);

    // Save the updated video tutorial
    await videoTutorial.save();

    // Return the updated video tutorial
    res.status(200).json(videoTutorial);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a video tutorial by ID
const deleteVideoTutorial = async (req, res) => {
  try {
    const videoTutorial = await VideoTutorial.findById(req.params.id);

    if (!videoTutorial) {
      res.status(404).json({ error: "Video Tutorial not found" });
    } else {
      await videoTutorial.deleteOne();
      res.status(200).json({ message: "Video Tutorial deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createVideoTutorial,
  getAllVideoTutorials,
  getVideoTutorialById,
  updateVideoTutorial,
  deleteVideoTutorial,
};
