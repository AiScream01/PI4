const express = require('express');
const router = express.Router();
const appMobileController = require('../controllers/appMobilieController');
const { createTokens, validateToken } = require("../jwt");


router.get('/', validateToken, appMobileController.list);
router.get('/noticiasparcerias', appMobileController.listNoticiasParcerias);

module.exports = router;