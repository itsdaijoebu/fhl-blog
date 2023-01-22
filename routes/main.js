const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.js');
const authController = require('../controllers/auth.js');
const auth = require('../middleware/auth.js');

const Post = require('../models/Post')
const pagination = require('../middleware/pagination')

router.get('/', pagination.pagination(Post), homeController.getIndex);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/about', homeController.getAbout);
// router.get('/contact', homeController.getContact);
router.post('/about', homeController.postContact);

module.exports = router;