const Sequelize = require('sequelize');
const sequelize = require('../config/db.Config');

const Role = sequelize.define("Role", {
    RoleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    RoleName: {
        type: Sequelize.STRING,
        allowNull: false

    }


});

module.exports = Role;