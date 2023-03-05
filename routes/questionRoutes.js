const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getOneQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questionController");
const router = express.Router({ mergeParams: true });

router.route("/").post(createQuestion).get(getAllQuestions);
router
  .route("/:id")
  .get(getOneQuestion)
  .delete(deleteQuestion)
  .patch(updateQuestion);

module.exports = router;
