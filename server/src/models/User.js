const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    unique: false,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  avatarURL: {
    type: String,
    required: true,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
