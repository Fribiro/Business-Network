const express = require('express');
const { investorLogin, investorRefreshtoken, logout, investorSignup } = require('../controllers/userAuth');
const router = express.Router();

router.post('/investor-login', investorLogin);

router.post('/investor-signup', investorSignup);

router.post('/refresh_token', investorRefreshtoken);

router.post('/logout', logout);

module.exports = router;