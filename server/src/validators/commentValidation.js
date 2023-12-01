/* Validación de comentarios utilizando express-validator*/

// Importación de body desde express-validator
const { body } = require("express-validator");

// Función para validar la creación de comentarios
const validateCommentCreate = () => {
  return [
    body("autor")
      .exists()
      .withMessage("Author is required")
      .isMongoId()
      .withMessage("Author ID must be a valid MongoDB ID"),
    body("description")
      .exists()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string")
      .isLength({ min: 3, max: 200 })
      .withMessage("Description must be between 3 and 200 characters"),
    body("post")
      .exists()
      .withMessage("Post is required")
      .isMongoId()
      .withMessage("Post ID must be a valid MongoDB ID"),
  ];
};

// Función para validar la edición de comentarios
const validateCommentEdit = () => {
  return [
    body("autor")
      .optional()
      .isMongoId()
      .withMessage("Author ID must be a valid MongoDB ID"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ min: 3, max: 500 })
      .withMessage("Description must be between 3 and 500 characters"),
    body("post")
      .optional()
      .isMongoId()
      .withMessage("Post ID must be a valid MongoDB ID"),
  ];
};

// Exportar las funciones de validación
module.exports = {
  validateCommentCreate,
  validateCommentEdit,
};
