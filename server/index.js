require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./src/config/db");

const usersRouter = require("./src/routes/userRoutes");
const postsRouter = require("./src/routes/postRoutes");
const commentRouter = require("./src/routes/commentRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(usersRouter);
app.use(postsRouter);
app.use(commentRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
  mongodb();
});
