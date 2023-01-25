const Post = require('../models/Post');

module.exports = {
    getPost: async (req, res) => {
        const post = await Post.findOne({titleUrl: req.params[0]})
        res.render('postOnly.ejs', {post: post})
    }
}