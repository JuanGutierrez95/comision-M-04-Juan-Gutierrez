/* Definición del esquema y modelo para las publicaciones usando Mongoose */

//Importación de mongoose
const { Schema, model, Types } = require("mongoose");

// Definición del esquema para las publicaciones
const PosteoSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  autor: {
    type: Types.ObjectId,
    ref: "usuario",
  },
  comentario: [
    {
      type: Types.ObjectId,
      ref: "comentario",
    }
  ],
  imageURL: {
    type: String,
  },
});

// Creación del modelo Post basado en el esquema definido
const Post = model("posteo", PosteoSchema);

// Exportar el modelo Post
module.exports = Post;


/* imageURL = 
https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1025px-Cat03.jpg
https://isabellaandrespereira.neocities.org/images/Gatito.jpg
*/