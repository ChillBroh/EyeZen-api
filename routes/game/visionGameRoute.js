const express = require("express");
const router = express.Router();

const gameController = require("../../controllers/game/gameController");

router.route("/vision-game").get(gameController.getAllVision);

module.exports = router;
