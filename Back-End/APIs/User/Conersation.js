const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const verify_TOKEY = require('../../middleware/Auth.js');

router.post("/conversation", verify_TOKEY, async (req, res) => {
    try {
        const { user_id } = req.user;

        const findManyConvasation = await prisma.chat_user.findMany({
            where: {
                OR: [
                    { chat_user_one: user_id },
                    { chat_user_two: user_id }
                ]
            }
        });

        const userIds = findManyConvasation.map(
            item => (item.chat_user_one === user_id ? item.chat_user_two : item.chat_user_one)
        );

        const users = await prisma.user.findMany({
            where: {
                user_id: {
                    in: userIds
                }
            }, select:
            {
                user_id: true,
                google_id: false,
                user_username: true,
                user_password: false,
                user_email: true,
                user_phone: true,
                user_name: true,
                user_profile_img: true
            }
        });

        chat_msg = await prisma.msg_user_reply.findMany({
            where: {
                fk_chat_id: {
                    in: findManyConvasation.chat_id
                }
            }
        });

        const data = { conversation: findManyConvasation, users, chat_msg };
        res.status(200).send(data)
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;