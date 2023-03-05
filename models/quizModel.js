const mongoose = require("mongoose");

const quizShema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A quiz must have a name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A quiz must have a description"],
  },
  createdAt: {
    type: Date,
    required: [true, "You must be set date for a quiz"],
    default: Date.now(),
  },
});

module.exports = mongoose.model("Quiz", quizShema);
