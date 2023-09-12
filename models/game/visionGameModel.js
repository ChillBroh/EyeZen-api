const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visionSchema = new Schema({
  image: {
    type: String,
    required: [true, "Must add a image URL"],
  },
  options: {
    type: [String],
    required: [true, "must add options"],
  },
  answer: {
    type: String,
    required: [true, "must add a answer"],
  },
});

const vision = mongoose.model("Vision Game", visionSchema);
module.exports = vision;
