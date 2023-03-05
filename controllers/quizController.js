const Quiz = require("../models/quizModel");

exports.createQuiz = async (req, res) => {
  //   console.log(req.body);
  const filteredBody = {};
  filteredBody.title = req.body.title;
  filteredBody.description = req.body.description;
  filteredBody.createdAt = req.body.createdAt || Date.now();
  try {
    const newQuiz = await Quiz.create(filteredBody);

    res.status(201).json({
      status: "success",
      data: {
        newQuiz: newQuiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      code: err.errorCode,
      error: err,
    });
  }
};

exports.getAllQuizes = async (req, res) => {
  try {
    const allQuiz = await Quiz.find({});
    res.status(200).json({
      status: "success",
      length: allQuiz.length,
      data: {
        quzes: allQuiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      code: err.errorCode,
      error: err,
    });
  }
};

exports.getOneQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        quiz: quiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      code: err.errorCode,
      error: err,
    });
  }
};

exports.updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  const updatedBody = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updatedBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        updatedQuiz: updatedQuiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      code: err.errorCode,
      error: err,
    });
  }
};

exports.deleteQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    res.status(204).json({
      status: "success",
      message: `Document contain ${quizId} has been successfully deleted.`,
      data: {
        deletedQuiz: deletedQuiz,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      code: err.errorCode,
      error: err,
    });
  }
};
