const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/register", async (req, res) => {
    try {
        // req.body.Email = req.body.Email.toLowercase;
        const { Username, Password, Email, ConfirmPassword } = req.body;
        console.log(req.body)
        if (!(Username && Password && Email)) {
            return res.status(400).send({ text: `All input is required!!!` });
        } else if (ConfirmPassword !== Password) {
            return res.status(410).send({ text: "Password Not Match" })
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { user_username: Username },
                    { user_email: Email }
                ]
            }
        });
        
        if (existingUser) {
            return res.status(409).send({ text: "User already exist." })

        }
        let tempUser = { Username: false, Email: false };
        redisClient.sismember("usernames", Username, (err, reply) => {
            if (err) {
                console.error(err);
            } else if (reply) {
                console.error("Username already in use:", Username);
                return res.status(409).send({ text: "Username already Exist" });
            } else {
                redisClient.sismember("emails", Email, (err, reply) => {
                    if (err) {
                        console.error(err);
                    } else if (reply) {
                        console.error("Email already in use:", Email);
                        return res.status(409).send({ text: "Email already Exist" });
                    } else {
                        redisClient.hmset(
                            "user:" + Email,
                            "user_username",
                            Username,
                            "user_email",
                            Email,
                            "user_password",
                            Password,
                            (err, reply) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log(reply);
                                    // Add the username and email to the Sets
                                    redisClient.sadd("usernames", Username);
                                    redisClient.sadd("emails", Email);
                                    // Set the expire time to 24 hours (in seconds)
                                    redisClient.expire("user:" + Email, 24 * 60 * 60);
                                    const verifyCode = Math.floor(Math.random() * 90000000) + 10000000;
                                    redisClient.setex(
                                        `VerifyCode:${Email}`,
                                        125, // 2 minutes (in seconds free 5 sec)
                                        verifyCode,
                                        (err, reply) => {
                                            if (err) {
                                                console.error(err);
                                            } else {
                                                console.log(`Verify code saved to Redis`);
                                                ////// Mailer Here \\\\\\\
                                            }
                                            return res.status(200).send({ text: "Create Account Success!" })
                                        }
                                    )
                                }
                            }
                        );
                    }
                });

            }
        });

        /*const newUser = await prisma.user.create({
            data: {
                user_username: Username,
                user_email: Email,
                user_password: Password,
                user_phone: 'test' + Username,
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
        res.status(201).send({ text: "Register Success!!", TOKEN: Token }); */

    } catch (err) {
        return console.log(err);
    }
});

router.post("/register-verify", async (req, res) => {
    try {
        const { VerifyCode, Email } = req.body;
        console.log(req.body);

    }
    catch (err) {

    }
});

router.post("/register-resend-verifyCode", async (req, res) => {
    try {
        const { Email } = req.body;
        console.log(req.body);

        redisClient.exists("user:" + Email, (err, reply) => {
            if (err) {
                console.error(err);
                // Handle the error
            } else if (reply === 1) {
                const verifyCode = Math.floor(Math.random() * 90000000) + 10000000;
                redisClient.setex(`VerifyCode:${Email}`, 125, verifyCode, (err, reply) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ error: "Internal Server Error" });
                    } else {
                        console.log(`Verify code updated to Redis`);
                        ////// Mailer Here \\\\\\\
                        return res.status(200).send({ text: "Verify Code Updated!" });
                    }
                });
            } else {
                console.log(`User with email ${Email} does not exist in Redis`);
                return res.status(404).send({ text: "User not Found 404!" });

            }
        });


    }
    catch (err) {

    }
});
module.exports = router;



