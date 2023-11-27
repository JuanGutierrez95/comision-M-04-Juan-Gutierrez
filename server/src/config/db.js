const mongoose = require("mongoose");

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const mongodb = async () => {
  try {
    console.log("Conectando a la base de datos... 🔄");
    await mongoose.connect(MONGO_DB_URI);
    console.log("Base de datos conectada ✨");
  } catch (error) {
    console.log("Error al conectar a la base de datos ❌", error);
  }
};

module.exports = mongodb;
