module.exports = {
    getIndex: (req, res) => {
        const paginatedResults = res.paginatedResults;
        res.render('index.ejs', {paginatedResults: paginatedResults});
    },
    getAbout: (req, res) => {
        res.render('about.ejs');
    },
    getContact: (req, res) => {
        res.render('contact.ejs')
    }
}