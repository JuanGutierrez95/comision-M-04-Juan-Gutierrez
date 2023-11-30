const userRouter = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./../controllers/UserController.js");

userRouter.get("/users", getUsers);

userRouter.get("/user/:id", getUser);

userRouter.post("/user", createUser);

userRouter.put("/user", updateUser);

userRouter.delete("/user", deleteUser);

module.exports = userRouter;
