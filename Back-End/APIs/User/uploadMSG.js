const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verify_TOKEN = require('../../middleware/Auth.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const checkOnline = require('./../../_methods/Redis_methods.js');

const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        const cid = req.headers.uniquekey_chat_id;
        const dir = `assets/user/chats/file/${cid}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, `assets/user/chats/file/${cid}`); // specify the upload directory
    },
    filename: function (req, file, cb) {
        const randomName = Math.random().toString(36).substring(2, 10) + '_' + Date.now();
        cb(null, randomName + '.' + file.originalname.split('.').pop()); // use the original file name
    }
});

const storageIMG = multer.diskStorage({
    destination: function (req, file, cb) {
        const cid = req.headers.uniquekey_chat_id;
        const dir = `assets/user/chats/image/${cid}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, `assets/user/chats/image/${cid}`); // specify the upload directory
    },
    filename: function (req, file, cb) {
        const randomName = Math.random().toString(36).substring(2, 10) + '_' + Date.now();
        cb(null, randomName + '.' + file.originalname.split('.').pop()); // use the original file name
    }
});


const uploadIMGFile = multer({ storage: storageIMG });
const uploadFile = multer({ storage: storageFile });

router.post("/upload/IMGFile", verify_TOKEN, uploadIMGFile.single("file"), async (req, res) => {
    const { user_id } = req.user;
    const { destination, filename } = req.file;
    const chat_id = parseInt(req.headers.uniquekey_chat_id);
    const io = require('./../../index.js');
    const segments = destination.split("/");
    const newpath = segments.slice(1).join("/");
    try {
        const findFriend = await prisma.chat_user.findFirst({
            where: {
                OR: [
                    {
                        chat_id: chat_id,
                        chat_user_one: user_id
                    },
                    {
                        chat_id: chat_id,
                        chat_user_two: user_id
                    }
                ]
            }
        });

        const FriendID = findFriend.chat_user_one === user_id ? findFriend.chat_user_two : findFriend.chat_user_one;
        const newMessage = await prisma.msg_user_reply.create({
            data: {
                fk_user_owner: user_id,
                fk_chat_id: chat_id,
                msg_type: "IMAGE",
                msg_reply_message: JSON.stringify({ src: `${newpath}/${filename}` }),
                msg_read: 0,
            }
        });

        if (checkOnline(FriendID)) {
            io.to(FriendID).emit('message', { newMessage });
        }
        io.to(user_id).emit('message', { newMessage });
        res.status(200).send({ text: "Send IMAGE.." })
    } catch (err) {
        console.log(err)
        res.status(500).send({ text: 'Server Error' });
    }
});

router.post("/upload/MSGFile", verify_TOKEN, uploadFile.single("file"), async (req, res) => {

    const { user_id } = req.user;
    const { destination, originalname, filename } = req.file;
    const chat_id = parseInt(req.headers.uniquekey_chat_id);
    const io = require('./../../index.js');
    const segments = destination.split("/");
    const newpath = segments.slice(1).join("/");
    try {
        const findFriend = await prisma.chat_user.findFirst({
            where: {
                OR: [
                    {
                        chat_id: chat_id,
                        chat_user_one: user_id
                    },
                    {
                        chat_id: chat_id,
                        chat_user_two: user_id
                    }
                ]
            }
        });

        const FriendID = findFriend.chat_user_one === user_id ? findFriend.chat_user_two : findFriend.chat_user_one;
        const newMessage = await prisma.msg_user_reply.create({
            data: {
                fk_user_owner: user_id,
                fk_chat_id: chat_id,
                msg_type: "FILE",
                msg_reply_message: JSON.stringify({ originalname, src: `${newpath}/${filename}` }),
                msg_read: 0,
            }
        });

        if (checkOnline(FriendID)) {
            io.to(FriendID).emit('message', { newMessage });
        }
        io.to(user_id).emit('message', { newMessage });
        res.status(200).send({ text: "Send File.." })
    } catch (err) {
        console.log(err)
        res.status(500).send({ text: 'Server Error' });
    }
});

module.exports = router;
