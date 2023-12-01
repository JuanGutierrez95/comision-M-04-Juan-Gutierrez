/* Operaciones CRUD para comentarios usando el modelo Comment */

// Importación del modelo Comment

const Comment = require("../models/Comment");

// Obtener todos los comentarios
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("autor").populate("post");
    return res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

// Obtener un comentario específico por ID
const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.find({
      post: id,
    }).populate("autor");
    return comment
      ? res.json(comment)
      : res.status(400).json({ message: "Comentario no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

// Crear un nuevo comentario
const createComment = async (req, res) => {
  try {
    const { autor, description, post } = req.body;
    const newComment = new Comment({
      autor: autor,
      description: description,
      post: post,
    });

    await newComment.save();

    res.status(200).json({ message: "Comentario creado" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

// Actualizar un comentario por ID
const updateComment = async (req, res) => {
  try {
    const { id, description } = req.body;
    await Comment.findByIdAndUpdate(id, {
      description: description,
    });
    return res.json({ message: "Comentario actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

// Eliminar un comentario por ID
const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    return res.json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

// Exportar las funciones de manipulación de comentarios
module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
