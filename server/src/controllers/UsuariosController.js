/* Operaciones CRUD para usuarios usando el modelo User */

// Importación del modelo User
const User = require("../models/User");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const listaUsuarios = await User.find();
    return res.json(listaUsuarios);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno",
      error: error,
    });
  }
};

// Obtener un usuario específico por ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEncontrado = await User.findById(id);

    return res.json(usuarioEncontrado);
  } catch (error) {
    let mensaje = "Ocurrió un error interno al intentar obtener el usuario";

    if (error.kind === "ObjectId") {
      mensaje = "No se pudo obtener el usuario";
    }

    return res.status(500).json({
      mensaje: mensaje,
      error: error,
    });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { usuario, password, nombres, apellidos, email, avatarURL } =
      req.body;

    const nuevoUsuario = new User({
      usuario: usuario,
      password: password,
      nombres: nombres,
      apellidos: apellidos,
      email: email,
      avatarURL: avatarURL,
    });
    await nuevoUsuario.save();
    return res.json({ mensaje: "Usuario creado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar crear el usuario",
      error: error,
    });
  }
};

// Editar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const { id, nombres, apellidos } = req.body;

    await User.findByIdAndUpdate(id, {
      nombres: nombres,
      apellidos: apellidos,
    });
    return res.json({ mensaje: "Usuario actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar editar el usuario",
      error: error,
    });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    await User.findByIdAndDelete(id);
    return res.json({ mensaje: "Usuario eliminado con éxito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Ocurrió un error interno al intentar eliminar el usuario",
      error: error,
    });
  }
};

// Exportar las funciones de manipulación de usuarios
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
