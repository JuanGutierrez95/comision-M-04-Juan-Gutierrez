/* Validación de usuarios utilizando express-validator */

// Importación de body desde express-validator
const { body } = require("express-validator").body;

// Función para validar la creación de usuarios
const validateUserCreate = () => {
  return [
    body("usuario")
      .trim()
      .isLength({ min: 3 })
      .withMessage("El usuario debe tener al menos 3 caracteres"),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("nombres")
      .trim()
      .notEmpty()
      .withMessage("El campo nombres no puede estar vacío"),
    body("apellidos")
      .trim()
      .notEmpty()
      .withMessage("El campo apellidos no puede estar vacío"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Ingrese un correo electrónico válido"),
    body("avatarURL")
      .trim()
      .isURL()
      .withMessage("Ingrese una URL válida para el avatar"),
  ];
};

// Función para validar la edición de usuarios
const validateUserEdit = () => {
  return [
    body("usuario")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("El usuario debe tener al menos 3 caracteres"),
    body("password")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("nombres")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("El campo nombres no puede estar vacío"),
    body("apellidos")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("El campo apellidos no puede estar vacío"),
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Ingrese un correo electrónico válido"),
    body("avatarURL")
      .optional()
      .trim()
      .isURL()
      .withMessage("Ingrese una URL válida para el avatar"),
  ];
};

// Exportar las funciones de validación
module.exports = {
  validateUserCreate,
  validateUserEdit,
};
