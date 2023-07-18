const Post = require('../models/Post')
const cloudinary = require("../middleware/cloudinary");
const jsonFile = require("../config/json-data")

module.exports = {
    getAdmin: (req, res) => {
        res.render('admin.ejs')
    },
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
                images: req.body.imageArray
            })
            res.redirect('add-post')
        } catch (err) {
            console.log(err)
        }
    },
    updateMongo: async (req, res) => {
        // const posts = await Post.find()
        res.redirect('/')
    },
    addJsonPosts: async (req, res) => {
        try {
            for (let post of jsonFile) {
                let imageUrls = []
                if (post.attachments) {
                    for (let imageUrl of post.attachments.images) {
                        imageUrls.push(imageUrl.img)
                    }
                }
                let message = ""
                if (post.message) {
                    message = post.message.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")
                }

                Post.create({
                    userID: req.user.id,
                    date: post.creation_time * 1000 || Date.now(),
                    title: post.post_title,
                    titleUrl: post.post_title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9\-]/gi, ''),
                    body: '<p>' + message + '</p>',
                    images: imageUrls
                })
            }
            res.render('add-json-posts', { jsonData: jsonFile })
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