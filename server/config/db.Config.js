const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect: "mysql",
        host: process.env.DATABASE_HOST,
        "define": {
            timestamps: false
        }
    });
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


module.exports = sequelize;
