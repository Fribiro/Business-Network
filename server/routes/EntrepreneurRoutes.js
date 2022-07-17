const express = require('express');
const { GetEntrepreneurById, UpdateEntrepreneurProfile } = require('../controllers/Entrepreneur');
const { entrepreneurLogin, entrepreneurRefreshtoken, logout, entrepreneurSignup } = require('../controllers/UserAuth');
const router = express.Router();

router.post('/entrepreneur-login', entrepreneurLogin);

router.post('/entrepreneur-signup', entrepreneurSignup);

router.post('/refresh_token', entrepreneurRefreshtoken);

router.get('/entrepreneur-dashboard/:id', GetEntrepreneurById);

router.post('/update-entrepreneur/:id', UpdateEntrepreneurProfile);

router.post('/logout', logout);

module.exports = router; 