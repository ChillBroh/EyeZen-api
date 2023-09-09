const express = require("express");
const router = express.Router();

const quizController = require("../../controllers/MainQuiz/quizController");

router
  .route("/")
  .post(quizController.createQuiz)
  .get(quizController.getAllQuiz);

router
  .route("/:id")
  .patch(quizController.updateQuestion)
  .delete(quizController.deleteQuiz)
  .get(quizController.updateQuestion);

module.exports = router;
