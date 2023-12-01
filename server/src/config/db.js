/* Configuración de conexión a MongoDB usando Mongoose */

// Importación de Módulos
const mongoose = require("mongoose");

// Configuración de la URI de la Base de Datos
const MONGO_DB_URI = process.env.MONGO_DB_URI;

// Función para Conectar a la Base de Datos
const mongodb = async () => {
  try {
    console.log("Connecting to the database... 🔄");
    await mongoose.connect(MONGO_DB_URI);
    console.log("Database connected ✨");
  } catch (error) {
    console.log("Error connecting to the database ❌", error);
  }
};

// Exportación de la Función de Conexión
module.exports = mongodb;
