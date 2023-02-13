const express = require('express');
const cors = require('cors');
const app = express();
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient()
// const jwt = require('jsonwebtoken');

const verify_TOKEY = require('./middleware/Auth.js');
const API_login = require('./APIs/User/login.js');
const API_register = require('./APIs/User/register.js');
const API_consersion = require('./APIs/User/Conersation.js');
// const PRIVATE_TOKEN_KEY = process.env.PRIVATE_TOKEN_KEY;


app.use(cors());
app.use(express.json());

app.use('/API/user', API_login);
app.use('/API/user', API_register);
app.use('/API/user', API_consersion);


app.post("/API/token/test", verify_TOKEY, (req, res) => {
    res.status(201).send('TOKEN is work! congratulations!!');
})

module.exports = app; 