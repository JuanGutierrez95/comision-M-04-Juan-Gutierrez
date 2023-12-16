/* Operaciones CRUD para publicaciones usando el modelo Post */

// Importación del modelo Post
const Post = require("../models/Post");
const { verificarToken } = require("../utils/token.js");

// Obtener todas las publicaciones
const getPosts = async (req, res) => {
  try {
    const listaPosteos = await Post.find().populate("autor", "-password");

    return res.json(listaPosteos);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};
// Obtener una publicación específica por ID
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const posteoEncontrado = await Post.findById(id);

    return res.json(posteoEncontrado);
  } catch (error) {
    let mensaje = "Ocurrió un error interno al intentar obtener la publicación";

    if (error.kind === "ObjectId") {
      mensaje = "No se pudo obtener la publicación";
    }

    return res.status(500).json({
      mensaje: mensaje,
      error: error,
    });
  }
};

// Crear una nueva publicación
const createPost = async (req, res) => {
  try {
    const { titulo, descripcion, imageURL } = req.body;

    const { token } = req.headers;

    const tokenValido = verificarToken(token);
    if (!tokenValido) {
      return res.status(500).json({
        mensaje: "El token no es válido",
        error: error,
      });
    }

    const autor = tokenValido.id;

    const nuevoPosteo = new Post({
      titulo: titulo,
      descripcion: descripcion,
      autor: autor,
      imageURL: imageURL,
    });

    await nuevoPosteo.save();

    return res.json({ mensaje: "Publicación creado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar crear la publicación",
      error: error,
    });
  }
};

// Actualizar una publicación por ID
const updatePost = async (req, res) => {
  try {
    const { id, titulo, descripcion, imageURL } = req.body;

    const { token } = req.headers;

    const tokenValido = verificarToken(token);

    if (!tokenValido) {
      return res.status(500).json({
        mensaje: "El token no es válido",
      });
    }

    const userId = tokenValido.id;

    const posteo = await Post.findById(id);

    if (posteo.autor.toString() !== userId) {
      return res.status(500).json({
        mensaje: "El autor no es el mismo",
      });
    }

    await Post.findByIdAndUpdate(id, {
      titulo: titulo,
      descripcion: descripcion,
      imageURL: imageURL,
    });
    return res.json({ mensaje: "Publicación actualizada con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar editar la publicación",
      error: error,
    });
  }
};

// Eliminar una publicación por ID
const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await Post.findByIdAndDelete(id);
    return res.json({ mensaje: "Publicación eliminada con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar eliminar la publicación",
      error: error,
    });
  }
};

// Exportar las funciones de manipulación de publicaciones
module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
