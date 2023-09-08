const Quiz = require("../../models/mainQuiz/MainQuiz");

//create quiz
const createQuiz = (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    const savedQuiz = newQuiz.save();
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

module.exports = { createQuiz };
