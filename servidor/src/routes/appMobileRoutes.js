const express = require('express');
const router = express.Router();
const appMobileController = require('../controllers/appMobileController');
//const { createTokens, validateToken } = require("../jwt");
//validateToken,

router.get('/', appMobileController.list);
router.get('/noticiasparcerias', appMobileController.listNoticiasParcerias);

module.exports = router;