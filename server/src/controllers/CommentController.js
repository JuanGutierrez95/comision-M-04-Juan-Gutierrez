const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("autor").populate("post");
    return res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

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

const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    return res.json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
