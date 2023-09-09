const express = require("express");
const infantQuizController = require("../controllers/infantQuizController");

const router = express.Router();

router
    .route("/")
    .post(infantQuizController.createQuiz)
    .get(infantQuizController.getAllQuizes);

router
    .route("/check")
    .post(infantQuizController.checkAnswers);

router
    .route("/:id")
    .put(infantQuizController.updateQuiz)
    .delete(infantQuizController.deleteQuiz);

module.exports = router;
