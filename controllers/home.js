const Post = require('../models/Post')

module.exports = {
    getIndex: async (req, res) => {
        const paginatedResults = res.paginatedResults;
        console.log(paginatedResults.pageCount)
        // console.log(req.query.page)
        res.render('index.ejs', {paginatedResults: paginatedResults});
    }
}