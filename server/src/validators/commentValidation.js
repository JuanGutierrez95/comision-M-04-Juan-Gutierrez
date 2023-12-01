const { body } = require("express-validator");

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

module.exports = {
  validateCommentCreate,
  validateCommentEdit,
};
