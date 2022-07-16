const express = require('express');
const { entrepreneurLogin, entrepreneurRefreshtoken, logout, entrepreneurSignup } = require('../controllers/userAuth');
const router = express.Router();

router.post('/entrepreneur-login', entrepreneurLogin);

router.post('/entrepreneur-signup', entrepreneurSignup);

router.post('/refresh_token', entrepreneurRefreshtoken);

router.post('/logout', logout);

module.exports = router; 