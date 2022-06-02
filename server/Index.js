const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

//initializing the app
const app = express();

//configuring our environmental variables
dotenv.config();

//fetching our port number from the .env file
const port = process.env.PORT;

//instructing the app to run on which port
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
}
  
