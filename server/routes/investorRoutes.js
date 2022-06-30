const express = require('express');
const { investorLogin } = require('../controllers/userAuth');
const router = express.Router();

router.post('/investor-login', investorLogin);

router.post('/refresh_token', refreshtoken);

router.post('/logout', logout);

module.exports = router;