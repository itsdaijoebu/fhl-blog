const Post = require('../models/Post')
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getAddPost: (req, res) => {
        res.render('addPost.ejs')
    },
    postAddPost: async (req, res) => {
        try {
        console.log(req.file.path)
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'fhl-website',
            resource_type: 'auto',
        })
        console.log(result)
        const post = Post.create({
            userID: req.user.id,
            date: req.body.date || Date.now(),
            title: req.body.title,
            body: req.body.body,
            images: result.secure_url
        })
        res.redirect('add-post')
        } catch (err) {
            console.log(err)
        }
    }
}

// const PostSchema = new MongoServerClosedError.Schema({
//     userID: {type: ObjectId, ref: "User", required: true},
//     date: {type: Date, default: Date.now},
//     likes: {type: Number, default: 0},
//     title: {type: String, required: true},
//     body: {type: String, required: true}
// })