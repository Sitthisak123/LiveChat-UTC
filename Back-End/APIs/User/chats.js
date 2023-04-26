const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const verify_TOKEN = require('../../middleware/Auth.js');
const checkOnline = require('./../../_methods/Redis_methods.js');


router.put('/NewChat', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { FriendID } = req.body;
    const io = require('./../../index.js');
    try {
        const newChat = await prisma.chat_user.create({
            data: {
                chat_user_one: user_id,
                chat_user_two: FriendID,
            }
        })
        if (checkOnline(FriendID)) {
            io.to(FriendID).emit('newChat', newChat);
        }else
        return res.status(200).send(newChat);

    } catch (error) {
        console.log(error);
        return res.status(400).send({ text: 'Create NewChat Error', route: '/Auth' });
    }

});

module.exports = router;