const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.js');
const authController = require('../controllers/auth.js');
const auth = require('../middleware/auth.js');

router.get('/add-post', adminController.addPost);

module.exports = router;