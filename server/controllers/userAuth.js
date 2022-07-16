const mysql = require("mysql2");
const { jwt, verify } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
} = require('../middleware/token');
const Investor = require("../models/investor");
const Entrepreneur = require("../models/entrepreneur");

exports.investorLogin = async (req, res) => {
    try {
        const { investorEmail, investorPassword } = req.body;

        if (!investorEmail || !investorPassword) {
            res.status(400).json({
                message: "Please provide an email and password",
            });
            return;
        }

        try {
            const investor = await Investor.findOne({ where: { InvestorEmail: investorEmail } });
            if (!investor) throw new Error("User does not exist.");

            const accesstoken = createAccessToken(investor.Id);
            const refreshtoken = createRefreshToken(investor.Id);

            await Investor.update(
                { InvestorToken: refreshtoken },
                { where: { InvestorEmail: investorEmail } }
            );
            console.log(investor);

            sendRefreshToken(res, refreshtoken);
            sendAccessToken(req, res, accesstoken);


        } catch (err) {
            res.send({
                error: `${err.message}`,
            });
        }

    } catch (err) {
        res.send({
            error: `${err.message}`,
        });
    }
};

exports.entrepreneurLogin = async (req, res) => {
    try {
        const { entrepreneurEmail, entrepreneurPassword } = req.body;

        if (!entrepreneurEmail || !entrepreneurPassword) {
            res.status(400).json({
                message: "Please provide an email and password",
            });
            return;
        }

        try {
            const entrepreneur = await Entrepreneur.findOne({ where: { EntrepreneurEmail: entrepreneurEmail } });
            if (!entrepreneur) throw new Error("User does not exist.");

            const accesstoken = createAccessToken(entrepreneur.Id);
            const refreshtoken = createRefreshToken(entrepreneur.Id);

            await Entrepreneur.update(
                { EntrepreneurToken: refreshtoken },
                { where: { EntrepreneurEmail: entrepreneurEmail } }
            );
            console.log(entrepreneur);

            sendRefreshToken(res, refreshtoken);
            sendAccessToken(req, res, accesstoken);


        } catch (err) {
            res.send({
                error: `${err.message}`,
            });
            console.log(err)
        }

    } catch (err) {
        res.send({
            error: `${err.message}`,
        });
        console.log(err)
    }
};

exports.investorRefreshtoken = async (req, res) => {
    const token = req.cookies.refreshtoken;
    console.log(token);


    if (!token) return res.send("No refreshtoken");

    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.send("Invalid token");
    }
    console.log(payload);


    const investor = await Investor.findOne({ where: { Id: payload.userId } });

    if (!investor) {
        return res.send("User not found!");
    }
    if (investor.InvestorToken !== token) {
        return res.send("Invalid token...");
    }
    const accesstoken = createAccessToken(investor.Id);
    const refreshtoken = createRefreshToken(investor.Id);
    await Investor.update(
        { InvestorToken: refreshtoken },
        { where: { InvestorEmail: investor.InvestorToken } }
    );

    sendRefreshToken(req, res, refreshtoken);
    const { InvestorEmail } = investor;
    return res.send({ accesstoken, refreshtoken, InvestorEmail });

};

exports.entrepreneurRefreshtoken = async (req, res) => {
    const token = req.cookies.refreshtoken;
    console.log(token);


    if (!token) return res.send("No refreshtoken");

    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.send("Invalid token");
    }
    console.log(payload);


    const entrepreneur = await Entrepreneur.findOne({ where: { Id: payload.userId } });

    if (!entrepreneur) {
        return res.send("User not found!");
    }
    if (entrepreneur.EntrepreneurToken !== token) {
        return res.send("Invalid token...");
    }
    const accesstoken = createAccessToken(entrepreneur.Id);
    const refreshtoken = createRefreshToken(entrepreneur.Id);
    await Entrepreneur.update(
        { EntrepreneurToken: refreshtoken },
        { where: { EntrepreneurEmail: entrepreneur.EntrepreneurEmail } }
    );

    sendRefreshToken(req, res, refreshtoken);
    const { EntrepreneurEmail } = entrepreneur;
    return res.send({ accesstoken, refreshtoken, EntrepreneurEmail });

};

exports.investorSignup = async (req, res) => {
    try {

        const {
            InvestorFirstName,
            InvestorLastName,
            InvestorEmail,
            InvestorPassword
        } = req.body;

        //validation 
        if (!InvestorFirstName) return res.status(400).send("investor first name is required");
        if (!InvestorLastName) return res.status(400).send("investor last name is required");
        if (!InvestorEmail) return res.status(400).send("email is required");
        if (!InvestorPassword) return res.status(400).send("password is required");

        if (!InvestorPassword || InvestorPassword.length < 6) {
            return res
                .status(400)
                .send("password is required and should be min 6 characters long");
        }

        const investorSignup = await Investor.create({
            InvestorFirstName,
            InvestorLastName,
            InvestorEmail,
            InvestorPassword
        })



        res.status(200).send({ investorSignup });

    } catch (error) {
        console.log("this is the investor create error=>", error);
        return res.status(400).send("Error. Try again.");
    }

};

exports.entrepreneurSignup = async (req, res) => {
    try {

        const {
            EntrepreneurFirstName,
            EntrepreneurLastName,
            EntrepreneurEmail,
            EntrepreneurPassword
        } = req.body;

        //validation 
        if (!EntrepreneurFirstName) return res.status(400).send("entrepreneur first name is required");
        if (!EntrepreneurLastName) return res.status(400).send("entrepreneur last name is required");
        if (!EntrepreneurEmail) return res.status(400).send("email is required");
        if (!EntrepreneurPassword) return res.status(400).send("password is required");


        if (!EntrepreneurPassword || EntrepreneurPassword.length < 6) {
            return res
                .status(400)
                .send("password is required and should be min 6 characters long");
        }

        const entrepreneurSignup = await Entrepreneur.create({
            EntrepreneurFirstName,
            EntrepreneurLastName,
            EntrepreneurEmail,
            EntrepreneurPassword
        });



        res.status(200).send({ entrepreneurSignup });

    } catch (error) {
        console.log("this is the entrepreneur create error=>", error);
        return res.status(400).send("Error. Try again.");
    }

};


exports.logout = async (req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    return res.send({
        message: 'Logged out'
    })
}