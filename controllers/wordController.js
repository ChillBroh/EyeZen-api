// controllers/wordController.js
const Word = require('../models/word');

exports.createWord = async (req, res) => {
  try {
    const { word, fontSize } = req.body;
    const newWord = new Word({ word, fontSize });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create word' });
  }
};

exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.find({}, 'word fontSize');
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch words' });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const updatedWord = await Word.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedWord);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update word' });
  }
};

exports.deleteWord = async (req, res) => {
  try {
    await Word.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete word' });
  }
};
