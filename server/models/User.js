const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.Config');

const User = sequelize.define("User", {
    UsersId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    UserRole: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true
    },
    UserEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UserToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = User;