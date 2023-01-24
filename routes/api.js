const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.js')

router.get('/getRecents', apiController.getRecent);
router.get('/getFromMonth', apiController.getFromMonth);

module.exports = router;