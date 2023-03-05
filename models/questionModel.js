const mongoose = require("mongoose");

const questionShema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A question must have a title"],
    trim: true,
  },
  mandatory: {
    type: Boolean,
    required: [true, "You should set this question either mandatory or not"],
    default: true,
  },
  quizId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, "You must be set a quiz"],
  },
  options: [
    {
      optionTitle: String,
      correct: {
        type: Boolean,
        default: false,
        select: false,
      },
    },
  ],
});

module.exports = mongoose.model("Question", questionShema);
