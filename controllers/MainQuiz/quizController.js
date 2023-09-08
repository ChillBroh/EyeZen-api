const Quiz = require("../../models/mainQuiz/MainQuiz");

//create quiz
const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    const savedQuiz = await newQuiz.save();
    res.status(200).json({
      status: "success",
      message: "Question and details added successfully",
      data: savedQuiz,
    });
  } catch (err) {
    res.status(400).json({
      status: "Unsuccess",
      message: err.message,
    });
  }
};

//get all quiz
const getAllQuiz = async (req, res) => {
  try {
    const allQuestions = await Quiz.find();
    res.status(200).send(allQuestions);
  } catch (err) {
    res.status(400).json({
      status: "unsuccess",
      message: err.message,
    });
  }
};

module.exports = { createQuiz, getAllQuiz };
