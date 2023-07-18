const Post = require('../models/Post')

module.exports = {
    getRecent: async (req, res) => {
        const recents = await Post.find().sort({date: -1}).limit(5).select('title titleUrl').exec();
        res.send(recents)
    },
    getFromMonth: async (req, res) => {
        const month = Number(req.query.month);
        const year = Number(req.query.year);
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(month===11 ? year+1 : year, month===11 ? 0 : month+1, 1);
        const postsFromMonth = await Post.find({
            date: {
                $gte: monthStart,
                $lt: monthEnd
            }
        })
        .sort({date: -1})
        .select('date titleUrl')
        .exec();

        res.send(postsFromMonth)
    }
}