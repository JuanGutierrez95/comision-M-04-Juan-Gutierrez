/* Middleware de validación utilizando express-validator */

// Importación de la función de validación de express-validator
const { validationResult } = require("express-validator");

// Middleware para validar las solicitudes
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Exportar el middleware de validación
module.exports = validatorMiddleware;
