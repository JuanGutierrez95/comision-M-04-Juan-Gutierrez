/* Enrutamiento para las operaciones de publicaciones usando Express */

// Importación del enrutador de Express
const postRouter = require("express").Router();

// Importación de middlewares y controladores
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

// Rutas para las operaciones de publicaciones
postRouter.get("/posts", getPosts);

postRouter.get("/post/:id", getPost);

postRouter.post("/post", createPost, validatorMiddleware, validatePostCreate);

postRouter.put("/post", updatePost, validatorMiddleware, validatePostEdit);

postRouter.delete("/post", deletePost);

// Exportar el enrutador postRouter
module.exports = postRouter;
