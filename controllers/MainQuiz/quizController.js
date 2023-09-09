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

const deleteQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteQ = await Quiz.findByIdAndDelete(id);
    res.status(204).json({
      status: "Success",
      data: {
        old: deleteQ,
        question: "Null",
      },
    });
  } catch (err) {
    res.send(400).json({
      status: "Unsuccess",
      message: err.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedQ = await Quiz.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "Success",
      data: {
        updatedQ,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: "unsuccess",
      message: err.message,
    });
  }
};

const getQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await Quiz.findById(id);
    res.status(200).json({
      status: "Success",
      data: {
        question,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: "unsuccess",
      message: err.message,
    });
  }
};

module.exports = {
  createQuiz,
  getAllQuiz,
  deleteQuiz,
  updateQuestion,
  getQuestion,
};
