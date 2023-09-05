const InfantQuiz = require("../models/infantQuiz");

const createQuiz = async (req, res) => {
  const questionText = req.body.question;
  const answers = req.body.answers; // An array of answer objects

  // Validate the incoming data as needed
  if (
    !questionText ||
    !answers ||
    !Array.isArray(answers) ||
    answers.length === 0
  ) {
    return res.json({
      status: "error",
      error: "Invalid question and answers data",
    });
  }

  try {
    // Find the last InfantQuiz document in the database
    const lastQuiz = await InfantQuiz.findOne().sort({ id: -1 });

    let lastQuestionId = 0;

    if (lastQuiz && lastQuiz.questions.length > 0) {
      // Get the last question's ID
      lastQuestionId = lastQuiz.questions[lastQuiz.questions.length - 1].id;
    }

    // Increment the last question's ID by one
    const newQuestionId = lastQuestionId + 1;

    // Create an instance of the InfantQuiz model
    const quizInstance = new InfantQuiz({
      questions: [
        {
          id: newQuestionId,
          question: questionText,
          answers: answers.map((answer, index) => ({
            id: index + 1, // Start with ID 1 and increment by one for each answer
            answer: answer.answer,
            isCorrect: answer.isCorrect,
          })),
        },
      ],
    });

    const savedQuiz = await quizInstance.save();
    res.json({ status: "ok", quizId: savedQuiz._id });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", error: error.message });
  }
};

module.exports = {
  createQuiz,
};
