const userRouter = require("express").Router();

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

userRouter.get("/users", getUsers);

userRouter.get("/user/:id", getUser);

userRouter.post("/user", createUser, validatorMiddleware, validateUserCreate);

userRouter.put("/user", updateUser, validatorMiddleware, validateUserEdit);

userRouter.delete("/user", deleteUser);

module.exports = userRouter;
