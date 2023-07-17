const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userID: {type: ObjectId, ref: "User", required: true},
    date: {type: Date, default: Date.now()},
    likes: {type: Number, default: 0},
    title: {type: String, required: true, unique: true},
    titleUrl: {type: String, unique: true},
    body: {type: String},
    images: [String]
})

module.exports = mongoose.model("Post", PostSchema)
