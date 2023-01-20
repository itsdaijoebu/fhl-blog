const Post = require('../models/Post')

module.exports = {
    getAddPost: (req, res) => {
        res.render('addPost.ejs')
    },
    postAddPost: (req, res) => {
        const post = Post.create({
            userID: req.user.id,
            date: req.body.date || Date.now(),
            title: req.body.title,
            body: req.body.body
        })
        console.log(req.user, req.body)
        console.log(post)
        res.redirect('add-post')
    }
}

// const PostSchema = new MongoServerClosedError.Schema({
//     userID: {type: ObjectId, ref: "User", required: true},
//     date: {type: Date, default: Date.now},
//     likes: {type: Number, default: 0},
//     title: {type: String, required: true},
//     body: {type: String, required: true}
// })