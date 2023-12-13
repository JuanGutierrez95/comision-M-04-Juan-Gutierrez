/* Cargar variables de entorno desde el archivo .env */
require("dotenv").config();

// Importar módulos
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./src/config/db");

// Importar routers para usuarios, publicaciones y comentarios
const usersRouter = require("./src/routes/userRoutes");
const postsRouter = require("./src/routes/postRoutes");
const commentsRouter = require("./src/routes/commentRoutes");

// Crear una instancia de la aplicación Express
const app = express();
const PORT = 3000;

// Usar bodyParser para analizar solicitudes con formato JSON
app.use(bodyParser.json());

// Usar los routers correspondientes para cada recurso
app.use(usersRouter);
app.use(postsRouter);
app.use(commentsRouter);

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
    // Establecer conexión a la base de datos MongoDB
  mongodb();
});
