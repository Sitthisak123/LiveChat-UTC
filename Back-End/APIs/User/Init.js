const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const verify_TOKEN = require('../../middleware/Auth.js');

router.post("/init", verify_TOKEN, async (req, res) => {
    try {
        /// Fetch User data
        const { user_id } = req.user;
        const findManyConversation = await prisma.chat_user.findMany({
            where: {
                OR: [
                    { chat_user_one: user_id },
                    { chat_user_two: user_id }
                ]
            }
        });



        /// Fetch MSGs data
        const chat_msg = await prisma.msg_user_reply.findMany({
            where: {
                fk_chat_id: {
                    in: findManyConversation.chat_id
                }
            }
        });

        /// Fetch Relationship [ Block: 0, Friend: 1, Favorite: 2, Request: 3]
        const Relations = await prisma.friends_relationship.findMany({
            where: {
                OR: [
                    { fk_user_one: user_id },
                    { fk_user_two: user_id }
                ]
            }
        });

        const userIds = findManyConversation.map(
            item => (item.chat_user_one === user_id ? item.chat_user_two : item.chat_user_one)
        );
        console.log(userIds);
        const otherUserIds = Relations.reduce((acc, curr) => {
            if (curr.fk_user_one !== user_id && !acc.has(curr.fk_user_one)) {
              acc.add(curr.fk_user_one);
            }
            if (curr.fk_user_two !== user_id && !acc.has(curr.fk_user_two)) {
              acc.add(curr.fk_user_two);
            }
            return acc;
          }, new Set());
          
          const allUserIds = Array.from(new Set([...userIds, ...otherUserIds]));
          
        console.log(allUserIds);
        /// Fetch other Users data
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
        const user = await prisma.user.findFirst({
            where: {
                user_id: user_id
            }, select:
            {
                user_id: true,
                google_id: true,
                user_username: true,
                user_password: false,
                user_email: true,
                user_phone: true,
                user_name: true,
                user_profile_img: true
            }
        });
        const data = { conversation: findManyConversation, users, chat_msg, Relations, user};
        res.status(200).send(data)
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;