const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_KEY = process.env.JWT_KEY;

const autenticar = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const usuarioEncontrado = await User.findOne({
      usuario: usuario,
      password: password,
    });

    if (!usuarioEncontrado) {
      return res.status(404).json({ mensaje: "El usuario no fue encontrado" });
    }

    const datos = {
      id: usuarioEncontrado._id,
      usuario: usuarioEncontrado.usuario,
      nombres: usuarioEncontrado.nombres,
      apellidos: usuarioEncontrado.apellidos,
      email: usuarioEncontrado.email,
      avatarURL: usuarioEncontrado.avatarURL,
    };

    let token = jwt.sign(datos, JWT_KEY, {
      expiresIn: "1h",
    });

    res.json({
      token: token,
      datos: datos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: "Se prodijo un error interno",
      error: error,
    });
  }
};

const verificarToken = (req, res) => {
  const token = req.body.token;

  try {
    let desencriptado = jwt.verify(token, JWT_KEY);
    res.json({
      datos: desencriptado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Se ha generado un error",
      error: error,
    });
  }
};

module.exports = {
  autenticar,
  verificarToken,
};
