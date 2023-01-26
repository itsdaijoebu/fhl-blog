const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer')

router.get('/add-post', adminController.getAddPost);
router.post('/add-post', upload.single('image'), adminController.postAddPost)

module.exports = router;