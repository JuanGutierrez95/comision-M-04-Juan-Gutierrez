const postRouter = require("express").Router();

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("./../controllers/PostController.js");

postRouter.get("/posts", getPosts);

postRouter.get("/post/:id", getPost);

postRouter.post("/post", createPost);

postRouter.put("/post", updatePost);

postRouter.delete("/post", deletePost);

module.exports = postRouter;
