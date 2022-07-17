const mysql = require("mysql2");
const Entrepreneur = require("../models/Entrepreneur");

module.exports = {
    async GetEntrepreneurById (req, res){
        try {
            let id = req.params.id;
            let entrepreneur = await Entrepreneur.findOne({ where: { Id: id } });

            res.status(200).send(entrepreneur);
            
        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }
        
    },

    async UpdateEntrepreneurProfile(req, res) {
        try {
            let id = req.params.id;

            const {
                EntrepreneurFirstName,
                EntrepreneurLastName,
                EntrepreneurEmail,
                EntrepreneurPassword
            } = req.body;

            await Entrepreneur.update(req.body, { where: { Id: id } });

            res.status(200).send("Details updated successfully");

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    }
}
