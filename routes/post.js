const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.js');

router.get('/*', postController.getPost);
router.post('/add-images', postController.addImages);

module.exports = router;