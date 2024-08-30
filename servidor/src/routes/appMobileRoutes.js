const express = require('express');
const router = express.Router();
const appMobileController = require('../controllers/appMobilieController');
//const { createTokens, validateToken } = require("../jwt");
//validateToken,

router.get('/:userId', appMobileController.list);

router.get('/noticiasparcerias', appMobileController.NoticiasParcerias);

module.exports = router;