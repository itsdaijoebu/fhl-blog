const Post = require('../models/Post')

module.exports = {
    getIndex: async (req, res) => {
        const paginatedResults = res.paginatedResults;
        console.log(paginatedResults.page)
        res.render('index.ejs', {paginatedResults: paginatedResults});
    }
}