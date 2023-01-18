const Post = require('../models/Post');

module.exports = {
    getPost: async (req, res) => {
        console.log('req', req.params[0])
        const post = await Post.findOne({titleUrl: req.params[0]})
        console.log(post)
        res.render('postOnly.ejs', {post: post})
    }
}