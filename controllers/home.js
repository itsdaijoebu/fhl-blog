module.exports = {
    getIndex: (req, res) => {
        const paginatedResults = res.paginatedResults;
        res.render('index.ejs', {paginatedResults: paginatedResults});
    }
}