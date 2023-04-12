const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const redis = require("redis");
const redisClient = redis.createClient();
const nodemailer = require("nodemailer");

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
                                        process.env.VERIFY_CODE_EXP,
                                        verifyCode,
                                        (err, reply) => {
                                            if (err) {
                                                console.error(err);
                                            } else {
                                                console.log(`Verify code saved to Redis`);
                                                ////// Mailer Here \\\\\\\
                                            }
                                            return res.status(200).send({ text: "Create Account Success!", Email })
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

router.post("/Services/register-verify", async (req, res) => {
    try {
        const { verifyCode, Email } = req.body;
        console.log(req.body);

        redisClient.sismember("emails", Email, async (err, reply) => {
            if (err) {
                console.error(err);
            } else if (reply) {
                redisClient.get(`VerifyCode:${Email}`, async (err, storedVerifyCode) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ text: "Internal Server Error" });
                    }
                    if (storedVerifyCode !== verifyCode) {
                        console.error("Incorrect verify code");
                        return res.status(400).send({ text: "Incorrect verify code" });
                    }
                    console.log("Verify code match");

                    // Get user data from Redis
                    redisClient.hgetall(`user:${Email}`, async (err, userData) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send({ text: "Internal Server Error" });
                        } else {
                            const newUser = await prisma.user.create({
                                data: {
                                    user_username: userData.user_username,
                                    user_email: userData.user_email,
                                    user_password: userData.user_password,
                                    user_phone: userData.user_username,
                                    user_name: 'Undefined',
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
                            console.log(`Inserted ${newUser.user_id} row(s) | use: ${newUser.user_username}`);
                            res.status(201).send({ text: "Register Success!!", TOKEN: Token });

                            // Delete user data from Redis
                            redisClient.del(`user: ${Email}`, (err, reply) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log(`User data deleted from Redis for email: ${Email}`);
                                }
                            });
                        }

                    });

                });

            } else {
                console.log("Your E-mail Has Verified or Deleted. please Sign Up again");
                return res.status(403).send({ text: "Your E-mail Has Verified or Deleted. please Sign Up again" });
            }

        });



    }
    catch (err) {
        console.error(err);
        return res.status(500).send({ text: "Internal Server Error" });
    }
});

router.post("/Services/register-resend-verifyCode", async (req, res) => {
    try {
        const { Email } = req.body;
        console.log(req.body);

        redisClient.exists("user:" + Email, (err, reply) => {
            if (err) {
                console.error(err);
                // Handle the error
            } else if (reply === 1) {
                const verifyCode = Math.floor(Math.random() * 90000000) + 10000000;
                redisClient.setex(`VerifyCode:${Email}`, process.env.VERIFY_CODE_EXP, verifyCode, (err, reply) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ error: "Internal Server Error" });
                    } else {
                        console.log(`Verify code updated to Redis`);
                        resend_verifyCod_MailerTo(Email,verifyCode)
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
        console.log(err);
    }
});
module.exports = router;


async function resend_verifyCod_MailerTo(Email,VerifyCode) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODE_MAILER_EMAIL, // generated ethereal user
            pass: process.env.NODE_MAILER_PASS, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"LiveChat-UTC" <Test@example.com>', // sender address
        to: Email, // list of receivers
        subject: "verification Code for verify your Email", // Subject line
        text: "Hello world? Test test", // plain text body
        html: `Your Verification Code is: <b>${VerifyCode}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
