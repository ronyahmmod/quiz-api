const express = require("express");
const questionRouter = require("./questionRoutes");
const {
  createQuiz,
  getAllQuizes,
  getOneQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");
const router = express.Router();

// router.get("/").get();
router.use("/:quizId/questions", questionRouter);
router.route("/").post(createQuiz);
router.route("/").get(getAllQuizes);

router.route("/:id").get(getOneQuiz).patch(updateQuiz).delete(deleteQuiz);

module.exports = router;
