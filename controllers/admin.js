const Post = require('../models/Post')
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getAddPost: (req, res) => {
        res.render('addPost.ejs')
    },
    postAddPost: async (req, res) => {
        try {
        // const result = await cloudinary.uploader.upload(req.file.path, {
        //     folder: 'fhl-website',
        //     resource_type: 'auto',
        // })
        const titleUrl = req.body.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9\-]/gi, ''); 
        const post = Post.create({
            userID: req.user.id,
            date: req.body.date || Date.now(),
            title: req.body.title,
            titleUrl: titleUrl,
            body: req.body.body,
            // images: result.secure_url
            images: result.imageArray
        })
        res.redirect('add-post')
        } catch (err) {
            console.log(err)
        }
    },
    updateMongo: async(req, res) => {
        // const posts = await Post.find()
        res.redirect('/')
    }

    
}

// const PostSchema = new MongoServerClosedError.Schema({
//     userID: {type: ObjectId, ref: "User", required: true},
//     date: {type: Date, default: Date.now},
//     likes: {type: Number, default: 0},
//     title: {type: String, required: true},
//     body: {type: String, required: true}
// })