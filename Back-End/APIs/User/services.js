const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


router.post('/Services/ForgotPassword', async (req, res) => {
    const { Email } = req.body;
    console.log(Email)
    const User_data = await prisma.user.findFirst({
        where: {
            user_email: Email,
        }
    })
    if (User_data) {
        MailerTo(Email);
        res.status(200).send({ text: 'Send Success' });
    } else {
        res.status(404).send({ text: 'User not found' });
    }
});
router.post('/Services/ChangePassword', async (req, res) => {
    const { pass_1, pass_2, FORGOT_PASS_TOKEN } = req.body;
    var Email = '';
    try {
        Email = jwt.verify(FORGOT_PASS_TOKEN, process.env.FORGOT_PASS_PRIVATE_TOKEN_KEY).user_email;
    } catch (err) {
        return res.status(401).send({ text: 'Your Token Expired!' });
    }
    try {
        const User_data = await prisma.user.update({
            where: {
                user_email: Email,
            },
            data: {
                user_password: pass_1,
            }
        })
        if (User_data) {
            res.status(200).send({ text: 'Your Password has been changed' });
        } else {
            res.status(400).send({ text: 'Error' });
        }
    } catch (err) {
        console.log(err);
        res.status(403).send({ text: 'Error' });

    }
});


async function MailerTo(Email, TOKEN) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "64301282028@utc.ac.th", // generated ethereal user
            pass: '1330301278046', // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"LiveChat-UTC" <Test@example.com>', // sender address
        to: Email, // list of receivers
        subject: "Your Link to Change Your Password", // Subject line
        text: "Hello world?", // plain text body
        html: `
        Change password <a href='http://${process.env.CLIENT_IP}:3000/Services/ChangePassword?Token=${await creatToken(Email)}'>Click Here</a>
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

async function creatToken(Email) {
    const Token = await jwt.sign(
        { user_email: Email },
        process.env.FORGOT_PASS_PRIVATE_TOKEN_KEY,
        { expiresIn: process.env.FORGOT_PASS_TOKEN_EXP }
    );
    return Token;
}

module.exports = router;