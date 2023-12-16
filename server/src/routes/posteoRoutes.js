/* Enrutamiento para las operaciones de publicaciones usando Express */

// Importación del enrutador de Express
const posteoRouter = require("express").Router();

// Importación de middlewares y controladores
const {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/PosteosController.js");
const validatorMiddleware = require("../middlewares/validatorMiddleware.js");
const { validatePostCreate, validatePostEdit } = require("../validators/postValidation.js");


// Rutas para las operaciones de publicaciones
posteoRouter.get("/publicaciones", getPosts);
//Ver posteo
posteoRouter.get("/publicacion/:id", getPost);
//Crear posteo
posteoRouter.post("/publicacion", createPost, validatorMiddleware, validatePostCreate);

//Editar posteo
posteoRouter.put("/publicacion", updatePost, validatorMiddleware, validatePostEdit);

//Eliminar posteo
posteoRouter.delete("/publicacion", deletePost);

// Exportar el enrutador postRouter
module.exports = posteoRouter;
