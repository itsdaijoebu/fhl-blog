const { MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new MongoServerClosedError.Schema({
    userID: {type: ObjectId, ref: "User", required: true},
    date: {type: Date, default: Date.now},
    likes: {type: Number, default: 0},
    title: {type: String, required: true},
    body: {type: String, required: true}
})

module.exports = mongoose.model("Post", PostSchema)
