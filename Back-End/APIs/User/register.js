const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
    try {
        // req.body.Email = req.body.Email.toLowercase;
        const { Username, Password, Email, ConfirmPassword} = req.body;
        console.log(req.body)
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
        console.log(existingUser? true:false);

        if (existingUser) {
            res.status(409).send("User already exist.")

        }else if(ConfirmPassword !== Password){
            res.status(410).send("Password Not Match")
        }
        else {

            const newUser = await prisma.user.create({
                data: {
                    user_username: Username,
                    user_email: Email,
                    user_password: Password,
                    user_phone: 'test'+Username,
                    user_name: 'Undefined',
                    google_id: undefined,
                },
                select: {
                    user_id: true
                }
            });
            console.log(newUser);

            const Token = jwt.sign(
                { user_id: newUser.user_id, Email },
                process.env.PRIVATE_TOKEN_KEY,
                { expiresIn: "5h" }
            );
            newUser.User_TOKEN = Token;
            console.log(`Inserted ${newUser.user_id} row(s) | use: ${Username}`);
            res.status(201).send({text: "Register Success!!", TOKEN: Token });
        }

    } catch (err) {
        return console.log(err);
    }
})

module.exports = router;