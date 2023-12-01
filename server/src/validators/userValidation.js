const { body } = require("express-validator").body;

const validateUserCreate = () => {
  return [
    body("username")
      .exists()
      .withMessage("Username is required")
      .isString()
      .withMessage("Username must be a string")
      .isLength({ min: 3, max: 50 })
      .withMessage("Username must be between 3 and 50 characters"),
    body("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .isLength({ min: 5, max: 40 })
      .withMessage("Email must be between 5 and 40 characters"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 4, max: 25 })
      .withMessage("Password must be between 4 and 25 characters"),
    body("avatarURL")
      .exists()
      .withMessage("Avatar URL is required")
      .isURL()
      .withMessage("Please provide a valid URL for the avatar"),
  ];
};

const validateUserEdit = () => {
  return [
    body("username")
      .optional()
      .isString()
      .withMessage("Name must be a string")
      .isLength({ min: 3, max: 50 })
      .withMessage("Name must be between 3 and 50 characters"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please enter a valid email address")
      .isLength({ min: 5, max: 40 })
      .withMessage("Email must be between 5 and 40 characters"),
    body("password")
      .optional()
      .isLength({ min: 4, max: 25 })
      .withMessage("Password must be between 4 and 25 characters"),
    body("avatarURL")
      .optional()
      .isURL()
      .withMessage("Please provide a valid URL for the avatar"),
  ];
};

module.exports = {
  validateUserCreate,
  validateUserEdit,
};
