/* Definición del esquema y modelo para los comentarios usando Mongoose */

// Importación de mongoose
const mongoose = require("mongoose");

// Definición del esquema para los comentarios
const commentSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
});

// Creación del modelo Comment basado en el esquema definido
const Comment = mongoose.model("Comment", commentSchema);

// Exportar el modelo Comment
module.exports = Comment;
