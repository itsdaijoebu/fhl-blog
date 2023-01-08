const Post = require('../models/Post')

module.exports = {
    getIndex: async (req, res) => {
        const posts = await Post.find().sort({date: -1});
        console.log(posts);
        res.render('index.ejs', {posts: posts});
    }
}