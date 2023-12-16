/* Enrutamiento para las operaciones de comentarios usando Express */

// Importación del enrutador de Express
const comentarioRouter = require("express").Router();


// Importación de middlewares y controladores
const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/ComentariosController.js");
const validatorMiddleware = require("../middlewares/validatorMiddleware.js");
const { validateCommentCreate, validateCommentEdit } = require("../validators/commentValidation.js");

// Rutas para las operaciones de comentarios
comentarioRouter.get("/comentarios/:idPosteo", getComments);

comentarioRouter.post("/comentarios", createComment, validatorMiddleware, validateCommentCreate);

comentarioRouter.put("/comentario", updateComment, validatorMiddleware, validateCommentEdit);

comentarioRouter.delete("/comentario", deleteComment);

// Exportar el enrutador commentRouter
module.exports = comentarioRouter;
