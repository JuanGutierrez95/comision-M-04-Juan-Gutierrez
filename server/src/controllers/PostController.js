const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("autor").populate("comments");
    return res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    return post
      ? res.json(post)
      : res.status(400).json({ message: "Post no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, autor, imageURL } = req.body;
    const newPost = new Post({
      title: title,
      description: description,
      autor: autor,
      imageURL: imageURL,
    });
    await newPost.save();

    res.status(200).json({ message: "Post creado" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id, title, description } = req.body;
    await Post.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
    return res.json({ message: "Post actualizado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await Post.findByIdAndDelete(id);
    return res.json({ message: "Post eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error interno", error: error });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
