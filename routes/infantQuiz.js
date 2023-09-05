const express = require("express");
const infantQuizController = require("../controllers/infantQuizController");

const router = express.Router();

router.route("/").post(infantQuizController.createQuiz);

module.exports = router;
