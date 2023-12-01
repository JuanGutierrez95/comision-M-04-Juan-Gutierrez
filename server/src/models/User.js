const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 40,
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
