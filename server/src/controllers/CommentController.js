/* Operaciones CRUD para comentarios usando el modelo Comment */

// Importación del modelo Comment

const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Obtener todos los comentarios
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

// Obtener un comentario específico por ID
const getComment = async (req, res) => {
  try {
    const { idPosteo } = req.params;
    const comment = await Comment.find({
      post: idPosteo,
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
    const { autor, description, idPosteo } = req.body;
    const newComment = new Comment({
      autor: autor,
      description: description,
      post: idPosteo,
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
    const { idPosteo, description } = req.body;
    await Comment.findByIdAndUpdate(idPosteo, {
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
    const { idPosteo } = req.body;
    await Comment.findByIdAndDelete(idPosteo);
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
