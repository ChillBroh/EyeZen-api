const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
});

const NumberModel = mongoose.model('Number', numberSchema);

module.exports = NumberModel;
