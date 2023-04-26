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
        const newfindManyConversation = findManyConversation.map((chat) => {
            if (chat.chat_user_one === user_id) {
                chat.chat_status_two = false;
                return chat;
            } else if (chat.chat_user_two === user_id) {
                chat.chat_status_one = false;
                return chat;
            }
        });
        
        /// Fetch MSGs data
        const chat_msg = await prisma.msg_user_reply.findMany({
            where: {
                fk_chat_id: {
                    in: findManyConversation.chat_id,
                }
            }
        });

        const filtered_Chate_MSG = chat_msg.filter((msg) => {
            //// User Has Delete by self
            if ((msg.fk_user_owner === user_id && msg.msg_status_owner === 1) || (msg.fk_user_owner !== user_id && msg.msg_status_other === 1)) {
                return false;
                //// has unsend by owner
            } else if (msg.msg_status_owner === 2 || msg.msg_status_other === 2) {
                msg.msg_reply_message = 'Unsend';
            }
            return true;
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


        /// Fetch other Users data
        const users = await prisma.user.findMany({
            where: {
                user_id: {
                    in: allUserIds
                }
            }, select:
            {
                user_id: true,
                google_id: false,
                user_custom_id: false,
                user_username: false,
                user_password: false,
                user_email: false,
                user_phone: false,
                user_name: true,
                user_profile_img: true,
                user_cover_img: true

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
                user_profile_img: true,
                user_cover_img: true,
                user_custom_id: true,

            }
        });
        const data = { conversation: newfindManyConversation, users, chat_msg: filtered_Chate_MSG, Relations, user };
        res.status(200).send(data)
    } catch (err) {
        console.log(err);
    }
})
module.exports = router;