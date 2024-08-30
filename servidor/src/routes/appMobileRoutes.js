const express = require('express');
const router = express.Router();
const appMobileController = require('../controllers/appMobilieController');
//const { createTokens, validateToken } = require("../jwt");
//validateToken,

router.get('/noticiasparcerias', appMobileController.NoticiasParcerias);

router.get('/:userId', appMobileController.list);

module.exports = router;