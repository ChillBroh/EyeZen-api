
const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  fontSize: { type: Number, default: 12 },
});

module.exports = mongoose.model('Word', wordSchema);
