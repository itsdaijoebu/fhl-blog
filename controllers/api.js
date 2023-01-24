const Post = require('../models/Post')

module.exports = {
    getRecent: async (req, res) => {
        const recents = await Post.find().sort({date: -1}).limit(5).select('title titleUrl').exec();
        res.send(recents)
    },
    getFromMonth: async (req, res) => {
        const month = req.query.month;
        const year = req.query.year;
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month+1, 1);
        const postsFromMonth = await Post.find({
            date: {
                $gte: monthStart,
                $lt: monthEnd
            }
        })
        .sort({date: -1})
        .select('date titleUrl')
        .exec();
        console.log('getmonth: ', postsFromMonth)

        res.send(postsFromMonth)
    }
}