const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  questions: {
    type: String,
    required: [true, "Must add a question"],
  },
  options: {
    type: ["String"],
    required: [true, "Must add options"],
  },
  answer: {
    type: String,
    required: [true, "must add a answer for healthy person"],
  },
  disease: {
    type: String,
    required: [true, "must add a specifc disease"],
  },
});

const quiz = mongoose.model("Quiz_Details", quizSchema);
module.exports = quiz;
