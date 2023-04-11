const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');


router.post("/login", async (req, res) => {
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
                google_id: false,
                user_username: false,
                user_password: false,
                user_email: true,
                user_phone: false,
                user_name: false,
                user_profile_img: false,
                user_cover_img: false
            }
        });
        if (findUser) {
            const { user_id, user_email } = findUser;
            const Token = jwt.sign(
                { user_id: user_id, user_email },
                process.env.PRIVATE_TOKEN_KEY,
                { expiresIn: process.env.TOKEN_EXP }
            );
            findUser.user_TOKEN = Token;
            res.status(200).send(findUser);
        } else {
            res.status(409).send("password incorrect.");
        }
    } catch (err) {
        console.log(err); 
    }
})


module.exports = router;