const commentRouter = require("express").Router();

const validatorMiddleware = require("../middlewares/validatorMiddleware.js");
const { validateCommentCreate, validateCommentEdit } = require("../validators/commentValidation.js");
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("./../controllers/CommentController.js");

commentRouter.get("/comments", getComments);

commentRouter.get("/comment/:id", getComment);

commentRouter.post("/comment/", createComment, validatorMiddleware, validateCommentCreate);

commentRouter.put("/comment", updateComment, validatorMiddleware, validateCommentEdit);

commentRouter.delete("/comment", deleteComment);

module.exports = commentRouter;
