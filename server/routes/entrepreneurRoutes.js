const express = require('express');
const { entrepreneurLogin } = require('../controllers/userAuth');
const router = express.Router();

router.post('/entrepreneur-login', entrepreneurLogin);

router.post('/refresh_token', refreshtoken);

router.post('/logout', logout);

module.exports = router;