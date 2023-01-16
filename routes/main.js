const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.js');
const authController = require('../controllers/auth.js');
const auth = require('../middleware/auth.js');

router.get('/', homeController.getIndex);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;