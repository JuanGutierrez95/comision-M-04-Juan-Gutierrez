/* Enrutamiento para las operaciones de usuarios usando Express */

// Importación del enrutador de Express
const userRouter = require("express").Router();

// Importación de middlewares y controladores
const validatorMiddleware = require("../middlewares/validatorMiddleware.js");
const {
  validateUserCreate,
  validateUserEdit,
} = require("../validators/userValidation.js");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./../controllers/UserController.js");

// Rutas para las operaciones de usuarios
userRouter.get("/users", getUsers);

userRouter.get("/user/:id", getUser);

userRouter.post("/user", createUser, validatorMiddleware, validateUserCreate);

userRouter.put("/user", updateUser, validatorMiddleware, validateUserEdit);

userRouter.delete("/user", deleteUser);

// Exportar el enrutador userRouter
module.exports = userRouter;
