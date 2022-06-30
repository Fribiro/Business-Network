const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.Config');

const Entrepreneur = sequelize.define("Entrepreneur", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    EntrepreneurFirstName: {
        type: Sequelize.STRING,
        allowNull: false

    },
    EntrepreneurLastName: {
        type: Sequelize.STRING,
        allowNull: false

    },
    EntrepreneurEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EntrepreneurPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },

    EntrepreneurToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Entrepreneur;