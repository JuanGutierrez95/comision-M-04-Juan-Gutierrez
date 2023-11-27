const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
