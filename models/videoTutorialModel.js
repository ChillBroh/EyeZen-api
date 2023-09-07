const mongoose = require("mongoose");

const videoTutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String, // Change photoUrl to videoUrl
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VideoTutorial", videoTutorialSchema);
