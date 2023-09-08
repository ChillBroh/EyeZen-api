const express = require("express");
const router = express.Router();
const quizController = require("../../controllers/MainQuiz/quizController");

router.route("/").post(quizController.createQuiz);
