const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.Config');

const Investor = sequelize.define("Investor", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    InvestorFirstName: {
        type: Sequelize.STRING,
        allowNull: false

    },
    InvestorLastName: {
        type: Sequelize.STRING,
        allowNull: false

    },
    InvestorEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    InvestorPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },

    InvestorToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Investor;