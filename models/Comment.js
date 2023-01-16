const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    comment: { type: String, required: true },
    likes: {type: Number, default: 0},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post"},
})

module.exports = mongoose.model("Comment", CommentSchema)