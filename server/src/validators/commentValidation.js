/* Validación de comentarios utilizando express-validator*/

// Importación de body desde express-validator
const { body } = require("express-validator");

// Función para validar la creación de comentarios
const validateCommentCreate = () => {
  return [
    body("descripcion").trim(),
    body("autor").trim().isMongoId().withMessage("ID de autor inválido"),
    body("posteo").trim().isMongoId().withMessage("ID de posteo inválido"),
  ];
};

// Función para validar la edición de comentarios
const validateCommentEdit = () => {
  return [
    body("descripcion").optional().trim(),
    body("autor")
      .optional()
      .trim()
      .isMongoId()
      .withMessage("ID de autor inválido"),
    body("posteo")
      .optional()
      .trim()
      .isMongoId()
      .withMessage("ID de posteo inválido"),
  ];
};

// Exportar las funciones de validación
module.exports = {
  validateCommentCreate,
  validateCommentEdit,
};
