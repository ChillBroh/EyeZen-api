const express = require('express');
const nearSightedController = require('../controllers/nearSightedController');
const router = express.Router();


router.get('/', nearSightedController.generateRandom);


module.exports = router;