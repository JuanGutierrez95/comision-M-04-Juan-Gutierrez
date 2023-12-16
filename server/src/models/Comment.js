/* Definición del esquema y modelo para los comentarios usando Mongoose */

// Importación de mongoose
const { Schema, model } = require("mongoose");

// Definición del esquema para los comentarios
const ComentarioSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: "usuario",
  },
  posteo: {
    type: Schema.Types.ObjectId,
    ref: "posteo",
  },
});

// Creación del modelo Comment basado en el esquema definido
const Comment = model("comentario", ComentarioSchema);

// Exportar el modelo Comment
module.exports = Comment;

