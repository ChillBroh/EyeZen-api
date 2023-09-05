const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  id: Number, // Unique ID for each answer
  answer: String,
  isCorrect: Boolean,
});

const QuestionSchema = new Schema({
  id: Number, // Unique ID for each question
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [AnswerSchema], // Use the AnswerSchema as a subdocument
    required: true,
  },
});

const InfantQuiz = new Schema({
  questions: [QuestionSchema], // Use the QuestionSchema as a subdocument array
});

const infantQuiz = mongoose.model("infant_quiz", InfantQuiz);
module.exports = infantQuiz;
