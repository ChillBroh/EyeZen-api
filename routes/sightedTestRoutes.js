const express = require('express');
const testNearSighted = require("../controllers/nearSightedController");

const router = express.Router();


router.get('/', testNearSighted.generateRandomWord);


module.exports = router;