const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
