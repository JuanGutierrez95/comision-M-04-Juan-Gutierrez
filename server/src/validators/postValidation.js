/* Validación de publicaciones utilizando express-validator */

// Importación de body desde express-validator
//const { body } = require("express-validator");

// Función para validar la creación de publicaciones
const validatePostCreate = () => {
  return [
    body("titulo")
      .trim()
      .notEmpty()
      .withMessage("El título no puede estar vacío"),
    body("descripcion").optional().trim(),
    body("autor").trim().isMongoId().withMessage("ID de autor inválido"),
    body("imageURL")
      .optional()
      .trim()
      .isURL()
      .withMessage("Ingrese una URL válida para la imagen"),
  ];
};

// Función para validar la edición de publicaciones
const validatePostEdit = () => {
  return [
    param("id").trim().isMongoId().withMessage("ID de post inválido"), // Validar el ID del post a editar
    body("titulo")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("El título no puede estar vacío"),
    body("descripcion").optional().trim(),
    body("autor")
      .optional()
      .trim()
      .isMongoId()
      .withMessage("ID de autor inválido"),
    body("imageURL")
      .optional()
      .trim()
      .isURL()
      .withMessage("Ingrese una URL válida para la imagen"),
  ];
};

// Exportar las funciones de validación
module.exports = {
  validatePostCreate,
  validatePostEdit,
};
