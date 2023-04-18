const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');

// Define a route for the router
router.post("/login", async (req, res) => {
    try {
        const { Username, Password } = req.body;
        if (!(Username && Password)) {
            return res.status(400).send(`All input is required!!!`);
        }
        const findUser = await prisma.admin.findFirst({
            where: {
                AND: [
                    { admin_password: Password },
                    {
                        OR: [
                            { admin_email: Username },
                            { admin_username: Username }
                        ]
                    }
                ] 
            }, select:
            {
                admin_id: true,
                admin_username: true,
                admin_password: false,
                admin_email: true,
                admin_phone: true,
                admin_name: true,
                admin_profile_img: true,
                admin_cover_img: true,
                admin_role: true,
            }
        });
        if (findUser) {
            const { admin_id, admin_email } = findUser;
            const Token = jwt.sign(
                { admin_id, admin_email },
                process.env.PRIVATE_TOKEN_KEY,
                { expiresIn: process.env.TOKEN_EXP }
            );
            findUser.admin_TOKEN = Token;
            res.status(200).send(findUser);
        } else {
            res.status(409).send("password incorrect.");
        }
    } catch (err) {
        console.log(err); 
    }
})

// Export the router
module.exports = router;