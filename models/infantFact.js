const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infantFactSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  imageURL: {
    type: String,
  },
});

const InfantFacts = mongoose.model("infant_fact", infantFactSchema);
module.exports = InfantFacts;
