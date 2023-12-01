const postRouter = require("express").Router();

const validatorMiddleware = require("../middlewares/validatorMiddleware.js");
const {
  validatePostCreate,
  validatePostEdit,
} = require("../validators/postValidation.js");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("./../controllers/PostController.js");

postRouter.get("/posts", getPosts);

postRouter.get("/post/:id", getPost);

postRouter.post("/post", createPost, validatorMiddleware, validatePostCreate);

postRouter.put("/post", updatePost, validatorMiddleware, validatePostEdit);

postRouter.delete("/post", deletePost);

module.exports = postRouter;
