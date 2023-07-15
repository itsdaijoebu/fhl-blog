const Post = require('../models/Post');
const { Types: { ObjectId } } = require('mongoose')

module.exports = {
    getPost: async (req, res) => {
        const post = await Post.findOne({ titleUrl: req.params[0] })
        res.render('postOnly.ejs', { post: post })
    },

    addImages: async (req, res) => {
        const id = ObjectId(req.body.id.trim())
        const imageArray = req.body.images;

        Post.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    images: {
                        $each:
                            imageArray
                    }
                }
            },
            { new: true }
        )
            .then(updatedDocument => {
                if (updatedDocument) {
                    console.log(`Successfully updated document: ${updatedDocument}.`)
                } else {
                    console.log("No document matches the provided query.")
                }
            })
            .catch(err => console.error(`Failed to update document: ${err}`))
    }
}