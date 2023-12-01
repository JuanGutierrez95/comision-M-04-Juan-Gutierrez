/* Enrutamiento para las operaciones de comentarios usando Express */

// Importación del enrutador de Express
const commentRouter = require("express").Router();

// Importación de middlewares y controladores
const validatorMiddleware = require("../middlewares/validatorMiddleware.js");
const { validateCommentCreate, validateCommentEdit } = require("../validators/commentValidation.js");
const {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("./../controllers/CommentController.js");

// Rutas para las operaciones de comentarios
commentRouter.get("/comments", getComments);

commentRouter.get("/comment/:id", getComment);

commentRouter.post("/comment/", createComment, validatorMiddleware, validateCommentCreate);

commentRouter.put("/comment", updateComment, validatorMiddleware, validateCommentEdit);

commentRouter.delete("/comment", deleteComment);

// Exportar el enrutador commentRouter
module.exports = commentRouter;
