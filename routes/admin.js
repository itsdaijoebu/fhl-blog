const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');
const authController = require('../controllers/auth.js');
const auth = require('../middleware/auth.js');

router.get('/add-post', adminController.getAddPost);
router.post('/add-post', adminController.postAddPost)

module.exports = router;