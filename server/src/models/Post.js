/* Definición del esquema y modelo para las publicaciones usando Mongoose */

//Importación de mongoose
const mongoose = require("mongoose");

// Definición del esquema para las publicaciones
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  ],

  imageURL: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creación del modelo Post basado en el esquema definido
const Post = mongoose.model("Post", postSchema);

// Exportar el modelo Post
module.exports = Post;
