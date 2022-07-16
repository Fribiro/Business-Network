const express = require('express');
const { GetInvestorById, UpdateInvestorProfile } = require('../controllers/investor');
const { investorLogin, investorRefreshtoken, logout, investorSignup } = require('../controllers/userAuth');
const router = express.Router();

router.post('/investor-login', investorLogin);

router.post('/investor-signup', investorSignup);

router.post('/refresh_token', investorRefreshtoken);

router.get('/investor-dashboard/:id', GetInvestorById);

router.post('/update-investor/:id', UpdateInvestorProfile);

router.post('/logout', logout);

module.exports = router;