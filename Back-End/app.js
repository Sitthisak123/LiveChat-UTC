require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const app = express();;
const prisma = new PrismaClient()
const verify_TOKEY = require('./middleware/Auth.js');
app.use(cors());
app.use(express.json());
const PRIVATE_TOKEN_KEY = process.env.PRIVATE_TOKEN_KEY;

//// USER REGISTER ////
app.post("/API/user/register", async (req, res) => {
    try {
        console.log(req.body);
        req.body.Email = req.body.Email.toLowercase;
        const { Username, Password, Email } = req.body;
        if (!(Username && Password && Email)) {
            return res.status(400).send(`All input is required!!!`);
        }
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { user_username: Username },
                    { user_email: Email }
                ]
            }
        })
        if (existingUser) {
            res.status(409).send("User already exist.")
        } else {
            const newUser = await prisma.user.create({
                data: {
                    user_username: Username,
                    user_email: Email,
                    user_password: Password,
                    user_email: 'Test',
                    user_phone: 'Test',
                    user_name: 'Test',
                    google_id: null,
                    user_profile_img: ''
                },
                select: {
                    user_id: true
                }
            });
            const Token = jwt.sign(
                { user_id: newUser.user_id, Email },
                PRIVATE_TOKEN_KEY,
                { expiresIn: "5h" }
            );
            newUser.User_TOKEN = Token;
            console.log(`Inserted ${newUser.user_id} row(s) | use: ${Username}`);
            res.status(201).send("Register Success!!");
        }

    } catch (err) {
        return console.log(err);
    }
})

//// USER Login ////
app.post("/API/user/login", async (req, res) => {
    try {
        const { Username, Password } = req.body;
        if (!(Username && Password)) {
            return res.status(400).send(`All input is required!!!`);
        }
        const findUser = await prisma.user.findFirst({
            where: {
                AND: [
                    { user_password: Password },
                    {
                        OR: [
                            { user_email: Username },
                            { user_username: Username }
                        ]
                    }
                ]
            }, select:
            {
                user_id: true,
                google_id: true,
                user_username: true,
                user_password: false,
                user_email: true,
                user_phone: true,
                user_name: true,
                user_profile_img: true}
        });
        if (findUser) {
            const { user_id, user_email } = findUser;
            const Token = jwt.sign(
                { user_id: user_id, user_email },
                PRIVATE_TOKEN_KEY,
                { expiresIn: "5h" }
            );
            findUser.User_TOKEN = Token;
            res.status(200).send(findUser);
        } else {
            res.status(409).send("User not found.");
        }
    } catch (err) {
        console.log(err);
    }
})

app.post("/API/token/test", verify_TOKEY, (req, res) => {
    res.status(201).send('TOKEN is work! congratulations!!');
})

module.exports = app;