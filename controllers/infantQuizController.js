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
    // Find the highest question ID across all quizzes in the database
    const highestQuestionId = await InfantQuiz.aggregate([
      {
        $unwind: "$questions",
      },
      {
        $group: {
          _id: null,
          maxId: { $max: "$questions.id" },
        },
      },
    ]);

    const newQuestionId =
      highestQuestionId.length > 0 ? highestQuestionId[0].maxId + 1 : 1;

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

// const createQuiz = async (req, res) => {
//   const questionText = req.body.question;
//   const answers = req.body.answers; // An array of answer objects

//   // Validate the incoming data as needed
//   if (
//     !questionText ||
//     !answers ||
//     !Array.isArray(answers) ||
//     answers.length === 0
//   ) {
//     return res.json({
//       status: "error",
//       error: "Invalid question and answers data",
//     });
//   }

//   try {
//     // Find the last InfantQuiz document in the database
//     const lastQuiz = await InfantQuiz.findOne().sort({ id: -1 });

//     let lastQuestionId = 0;

//     if (lastQuiz && lastQuiz.questions.length > 0) {
//       // Get the last question's ID
//       lastQuestionId = lastQuiz.questions[lastQuiz.questions.length - 1].id;
//     }

//     // Increment the last question's ID by one
//     const newQuestionId = lastQuestionId + 1;

//     // Create an instance of the InfantQuiz model
//     const quizInstance = new InfantQuiz({
//       questions: [
//         {
//           id: newQuestionId,
//           question: questionText,
//           answers: answers.map((answer, index) => ({
//             id: index + 1, // Start with ID 1 and increment by one for each answer
//             answer: answer.answer,
//             isCorrect: answer.isCorrect,
//           })),
//         },
//       ],
//     });

//     const savedQuiz = await quizInstance.save();
//     res.json({ status: "ok", quizId: savedQuiz._id });
//   } catch (error) {
//     console.error(error.message);
//     res.json({ status: "error", error: error.message });
//   }
// };

// const updateQuiz = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { question, answers } = req.body;

//     // Find the question with the matching 'id' and update it
//     const updatedQuiz = await InfantQuiz.findOneAndUpdate(
//       { "questions.id": id },
//       {
//         $set: {
//           "questions.$.question": question,
//           "questions.$.answers": answers,
//         },
//       },
//       { new: true }
//     );

//     if (!updatedQuiz) {
//       return res.status(404).json({ error: "Question not found." });
//     }

//     res.status(200).json(updatedQuiz);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the question." });
//   }
// };

// const deleteQuiz = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find the question with the matching 'id' and remove it
//     const updatedQuiz = await InfantQuiz.findOneAndDelete(
//       { "questions.id": id },
//       {
//         $pull: {
//           questions: { id },
//         },
//       },
//       { new: true }
//     );

//     if (!updatedQuiz) {
//       return res.status(404).json({ error: "Question not found." });
//     }

//     res.status(200).json(updatedQuiz);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting the question." });
//   }
// };

const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answers } = req.body;

    // Find the question with the matching '_id' and update it
    const updatedQuiz = await InfantQuiz.findOneAndUpdate(
      { "questions._id": id },
      {
        $set: {
          "questions.$.question": question,
          "questions.$.answers": answers,
        },
      },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ error: "Question not found." });
    }

    res.status(200).json(updatedQuiz);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the question." });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the question with the matching '_id' and remove it
    const updatedQuiz = await InfantQuiz.findOneAndDelete(
      { "questions._id": id },
      {
        $pull: {
          questions: { _id: id },
        },
      },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ error: "Question not found." });
    }

    res.status(200).json(updatedQuiz);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the question." });
  }
};

const getAllQuizes = async (req, res) => {
  try {
    // Retrieve all questions and answers
    const allQuestions = await InfantQuiz.find({}, "questions");

    if (!allQuestions) {
      return res.status(404).json({ error: "No questions found." });
    }

    // Extract just the questions and answers from the result
    const questionsAndAnswers = allQuestions.map((quiz) => quiz.questions);

    res.status(200).json(questionsAndAnswers);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching questions and answers.",
    });
  }
};

const checkAnswers = async (req, res) => {
  try {
    const userAnswers = req.body.userAnswers;

    // Retrieve all questions from your database
    const quizzes = await InfantQuiz.find({});

    // Initialize the score
    let score = 0;

    // Iterate through quizzes
    for (const quiz of quizzes) {
      for (const question of quiz.questions) {
        const questionId = question.id;
        const userAnswerId = userAnswers[questionId];

        // Find all correct answers for this question
        const correctAnswers = question.answers.filter(
          (answer) => answer.isCorrect
        );

        // Check if the user's answer ID matches any of the correct answer IDs
        if (
          correctAnswers.some(
            (correctAnswer) => correctAnswer.id === userAnswerId
          )
        ) {
          score += 1;
        }
      }
    }

    res.json({ score });
  } catch (error) {
    console.error("Error calculating score:", error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating the score." });
  }
};

module.exports = {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizes,
  checkAnswers,
};
