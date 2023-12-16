/* Operaciones CRUD para comentarios usando el modelo Comment */

// Importación del modelo Comment
const { verificarToken } = require("../utils/token.js");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Obtener todos los comentarios
const getComments = async (req, res) => {
  try {
    const { idPosteo } = req.params;

    const comentariosEncontrados = await Comment.find({
      posteo: idPosteo,
    }).populate("autor", "-password");

    return res.json(comentariosEncontrados);
  } catch (error) {
    return res.status(500).json({
      mensaje: "No pudo obtener los comentarios de la publicación",
      error: error,
    });
  }
};

// Crear un nuevo comentario
const createComment = async (req, res) => {
  try {
    const { descripcion, idPosteo } = req.body;
    const { token } = req.headers;

    const tokenValido = verificarToken(token);

    if (!tokenValido) {
      return res.status(500).json({
        mensaje: "El token no es válido",
      });
    }

    const autor = tokenValido.id;

    const nuevoComentario = new Comment({
      descripcion: descripcion,
      autor: autor,
      posteo: idPosteo,
    });

    await nuevoComentario.save();

    return res.json({
      mensaje: "Comentario creado con éxito",
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar crear",
      error: error,
    });
  }
};

// Actualizar un comentario por ID
const updateComment = async (req, res) => {
  try {
    const { idPosteo, description } = req.body;

    const { token } = req.headers;

    const tokenValido = verifyToken(token);

    if (!tokenValido) {
      return res
        .status(500)
        .json({ message: "The token is not valid", error: error });
    }

    const userId = tokenValido.id;

    const comment = await Post.findById(idPosteo);

    if (comment.autor.toString() !== userId) {
      return res.status(500).json({
        message: "You are not authorized to update this comment",
        error: error,
      });
    }

    await Comment.findByIdAndUpdate(idPosteo, {
      description: description,
    });
    return res.json({ message: "Comment updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An internal error occurred", error: error });
  }
};

// Eliminar un comentario por ID
const deleteComment = async (req, res) => {
  try {
    const { idPosteo } = req.body;
    await Comment.findByIdAndDelete(idPosteo);
    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An internal error occurred", error: error });
  }
};

// Exportar las funciones de manipulación de comentarios
module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
