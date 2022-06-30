const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { readdirSync } = require('fs');

const app = express();
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5001;

//allow the client to communicate with the api
app.use(cors());

//Parse JSON bodies as sent by API clients
app.use(express.json());

//parse URL encoded bodies as sent by HTML forms. Enables us to grab data from any form
app.use(express.urlencoded({extended: true}));

//get all routes from the routes folder
//readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

//create respective tables from models
const investor = require('./models/investor');
const entrepreneur = require('./models/entrepreneur');

investor.sync();
entrepreneur.sync();
console.log("All models were synchronized successfully.");

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});



