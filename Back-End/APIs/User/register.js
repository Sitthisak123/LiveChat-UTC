const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

router.post("/register", async (req, res) => {
    try {
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

module.exports = router;