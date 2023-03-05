const Question = require("../models/questionModel");

exports.createQuestion = async (req, res) => {
  try {
    const cloneBody = { ...req.body };
    if (req.params.quizId) cloneBody.quizId = req.params.quizId;
    const newQuestion = await Question.create(cloneBody);

    res.status(201).json({
      status: "success",
      data: {
        newQuestion,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      errorCode: err.code,
      err: err,
    });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find({ quizId: req.params.quizId });
    res.status(200).json({
      status: "success",
      length: allQuestions.length,
      data: {
        allQuestions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      errorCode: err.code,
      err: err,
    });
  }
};

exports.getOneQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    res.status(200).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      errorCode: err.code,
      err: err,
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    res.status(204).json({
      status: "success",
      body: {
        deletedQuestion,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      errorCode: err.code,
      err: err,
    });
  }
};

exports.updateQuestion = async (req, res) => {
  const questionId = req.params.id;
  const updatedBody = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updatedBody,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      body: {
        updatedQuestion,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      errorCode: err.code,
      err: err,
    });
  }
};
