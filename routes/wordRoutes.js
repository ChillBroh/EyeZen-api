const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.post('/', wordController.createWord);
router.get('/', wordController.getAllWords);
router.put('/:id', wordController.updateWord);
router.delete('/:id', wordController.deleteWord);

module.exports = router;