const commentRouter = require("express").Router();

const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("./../controllers/CommentController.js");

commentRouter.get("/comments", getComments);

commentRouter.get("/comment/:id", getComment);

commentRouter.post("/comment/", createComment);

commentRouter.put("/comment", updateComment);

commentRouter.delete("/comment", deleteComment);

module.exports = commentRouter;
