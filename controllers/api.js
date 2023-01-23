const Post = require('../models/Post')

module.exports = {
    getRecent: async (req, res) => {
        const recents = await Post.find().sort({date: -1}).limit(5).select('title titleUrl').exec();
        console.log('recents', recents)
        res.send(recents)
    }
}