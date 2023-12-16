/* Enrutamiento para las operaciones de usuarios usando Express */

// Importación del enrutador de Express
const usuarioRouter = require("express").Router();

// Importación de middlewares y controladores
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UsuariosController.js");
const validatorMiddleware = require("../middlewares/validatorMiddleware.js");
const { validateUserCreate, validateUserEdit } = require("../validators/userValidation.js");

// Rutas para las operaciones de usuarios
//Ver usuarios
usuarioRouter.get("/usuarios", getUsers);
//Ver usuario
usuarioRouter.get("/usuario/:id", getUser);
//Crear usuario
usuarioRouter.post("/usuario", createUser, validatorMiddleware, validateUserCreate);

//Editar usuario
usuarioRouter.put("/usuario", updateUser, validatorMiddleware, validateUserEdit);

//Eliminar usuario
usuarioRouter.delete("/usuario", deleteUser);

module.exports = usuarioRouter;
