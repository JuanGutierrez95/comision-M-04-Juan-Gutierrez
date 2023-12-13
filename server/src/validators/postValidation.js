/* Validación de publicaciones utilizando express-validator */

// Importación de body desde express-validator
const { body } = require("express-validator");

// Función para validar la creación de publicaciones
const validatePostCreate = () => {
  return [
    body("title")
      .exists()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 3, max: 50 })
      .withMessage("Title must be between 3 and 50 characters"),
    body("description")
      .exists()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string")
      .isLength({ min: 3, max: 200 })
      .withMessage("Description must be between 3 and 200 characters"),
    body("autor")
      .exists()
      .withMessage("Author is required")
      .isMongoId()
      .withMessage("Author ID must be a valid MongoDB ID"),
    /*body("comments")
      .optional()
      .isArray()
      .withMessage("Comments must be an array of comment IDs"),
    */
      body("imageURL")
      .exists()
      .withMessage("Image URL is required")
      .isURL()
      .withMessage("Please provide a valid URL for the image"),
  ];
};

// Función para validar la edición de publicaciones
const validatePostEdit = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 3, max: 50 })
      .withMessage("Title must be between 3 and 50 characters"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string")
      .isLength({ min: 3, max: 500 })
      .withMessage("Description must be between 3 and 500 characters"),
    body("autor")
      .optional()
      .isMongoId()
      .withMessage("Author ID must be a valid MongoDB ID"),
    /*
      body("comments")
      .optional()
      .isArray()
      .withMessage("Comments must be an array of comment IDs"),
    */
      body("imageURL")
      .optional()
      .isURL()
      .withMessage("Please provide a valid URL for the image"),
  ];
};

// Exportar las funciones de validación
module.exports = {
  validatePostCreate,
  validatePostEdit,
};
