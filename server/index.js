/* Cargar variables de entorno desde el archivo .env */
require("dotenv").config();

// Importar módulos
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./src/config/db");
const cors = require("cors");
//const morgan = require("morgan");
//const helmet = require("helmet");

// Importar routers para usuarios, publicaciones y comentarios
const usuarioRouter = require("./src/routes/usuarioRoutes.js");
const posteoRouter = require("./src/routes/posteoRoutes.js");
const comentarioRouter = require("./src/routes/comentarioRoutes.js");
const autenticacionRouter = require("./src/routes/autenticacionRoutes.js");
// Crear una instancia de la aplicación Express
const app = express();
const PORT = 3000;

// Usar bodyParser para analizar solicitudes con formato JSON
app.use(bodyParser.json());
app.use(cors());
//app.use(morgan("dev"));
//app.use(
//helmet({
//contentSecurityPolicy: false,
// })
//);

// Usar los routers correspondientes para cada recurso
app.use(usuarioRouter);
app.use(posteoRouter);
app.use(comentarioRouter);
app.use(autenticacionRouter);

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
  // Establecer conexión a la base de datos MongoDB
  mongodb();
});
