const mysql = require('mysql');
require('dotenv').config(); 
///-> SetUp <-///
const { DB_USERNAME, DB_ADDRESS, DB_PASSWORD, DB_NAME } = process.env;
/////////////////

const db = mysql.createConnection({
    user: DB_USERNAME,
    host: DB_ADDRESS,
    password: DB_PASSWORD,
    database: DB_NAME
  })
module.exports = db;