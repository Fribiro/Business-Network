const mysql = require("mysql2");
const Investor = require("../models/Investor");

module.exports = {
    async GetInvestorById(req, res) {
        try {
            let id = req.params.id;
            let investor = await Investor.findOne({ where: { Id: id } });

            res.status(200).send(investor);

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    },

    async UpdateInvestorProfile(req, res) {
        try {
            let id = req.params.id;

            const {
                InvestorFirstName,
                InvestorLastName,
                InvestorEmail,
                InvestorPassword
            } = req.body;

            await Investor.update(req.body, { where: { Id: id } });

            res.status(200).send("Details updated successfully");

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    }
}