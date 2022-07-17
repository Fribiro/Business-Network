const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { readdirSync } = require('fs');

const app = express();
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Origin",
        "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, x-access-token, Content-Type, Accept"
    );
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

//allow the client to communicate with the api
const corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));

//Parse JSON bodies as sent by API clients
app.use(express.json());

//parse URL encoded bodies as sent by HTML forms. Enables us to grab data from any form
app.use(express.urlencoded({extended: true}));

//get all routes from the routes folder
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

//create respective tables from models
const investor = require('./models/Investor');
const entrepreneur = require('./models/Entrepreneur');
const role = require('./models/Role');
const user = require('./models/User');

//one to may relationship
role.hasMany(user, {
    foreignKey: 'userId',
    as: 'User'
})

user.belongsTo(role, {
    foreignKey: 'userId',
    as: 'Role'
})

investor.sync();
entrepreneur.sync();
role.sync();
user.sync();
//sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});



