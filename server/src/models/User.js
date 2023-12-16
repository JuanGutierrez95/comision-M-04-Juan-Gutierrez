/* Definición del esquema y modelo para los usuarios usando Mongoose */

//Importación de mongoose
const { Schema, model } = require("mongoose");

// Definición del esquema para los usuarios
const UsuarioSchema = new Schema({
  usuario: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
    default:
      "https://img.freepik.com/vector-premium/negocios-economia-global_24877-41082.jpg",
  },
});

// Creación del modelo User basado en el esquema definido
const User = model("usuario", UsuarioSchema);

// Exportar el modelo User
module.exports = User;

//avatarURL: https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg