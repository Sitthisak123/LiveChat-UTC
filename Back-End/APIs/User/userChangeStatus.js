const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const verify_TOKEN = require('../../middleware/Auth.js');
const redis = require("redis");
const redisClient = redis.createClient();
const checkOnline = require('./../../_methods/Redis_methods.js');

router.put('/update/name', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { newName } = req.body;
    try {
        const updatename = await prisma.user.update({
            where: {
                user_id: user_id
            },
            data: {
                user_name: newName
            }
        });
    } catch (err) {
        console.log(err);
    }
    res.send('Name has Changed');
});

router.put('/update/phoneNumber', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { newPhone } = req.body;
    console.log(newPhone);
    try {
        const existPhone = await prisma.user.count({
            where: {
                user_phone: newPhone,
            }
        })
        if (existPhone) {
            return res.status(405).send({ text: "the Phone number already in used" });
        } else {
            const updatePhone = await prisma.user.update({
                where: {
                    user_id: user_id,
                },
                data: {
                    user_phone: newPhone,
                }
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(403).send({ text: "error while update user phone number" });
    }
    res.status(200).send({ text: 'Phone Number has Changed' });
});

router.put('/update/Email', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { newEmail } = req.body;
    console.log(newEmail);

    try {
        const existEmail = await prisma.user.count({
            where: {
                user_email: newEmail,
            }
        });

        if (existEmail) {
            return res.status(405).send({ text: "The email is already in use." });
        } else {
            redisClient.sismember("emails", newEmail, (err, reply) => {
                if (err) {
                    console.error(err);
                } else if (reply) {
                    console.error("Email already in use:", newEmail);
                    return res.status(409).send({ text: "The email is already in use." });
                } else {
                    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit verification code
                    redisClient.setex(
                        `ChangeEmail-Email:${user_id}`,
                        process.env.VERIFY_CODE_EXP,
                        newEmail,
                        (err, reply) => {
                            if (err) {
                                console.error(err);
                            } else {
                                redisClient.setex(
                                    `ChangeEmail-VerifyCode:${user_id}`,
                                    process.env.VERIFY_CODE_EXP,
                                    verificationCode,
                                    (err, reply) => {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            // resend_verifyCod_MailerTo(Email, verifyCode);
                                            console.log(`Verify code create to Redis`);
                                            return res.status(200).send({ text: "send verifycode to email Success!", newEmail })
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            });

        }

    } catch (err) {
        console.log(err);
        return res.status(403).send({ text: "Error while updating user email." });
    }
});

router.put('/update/Email-verify', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { verificationCode } = req.body;

    try {
        const newEmail = await redisGet(`ChangeEmail-Email:${user_id}`);
        const storedVerificationCode = await redisGet(`ChangeEmail-VerifyCode:${user_id}`);
        console.log(`${verificationCode} === ${storedVerificationCode}`)
        if (verificationCode === storedVerificationCode) {
            const existEmail = await prisma.user.count({
                where: {
                    user_email: newEmail,
                }
            });
            if (existEmail) {
                return res.status(405).send({ text: "The email is already in use." });
            } else {
                await prisma.user.update({
                    where: {
                        user_id: user_id,
                    },
                    data: {
                        user_email: newEmail,
                    }
                });
                await redisDel(`ChangeEmail-Email:${user_id}`);
                await redisDel(`ChangeEmail-VerifyCode:${user_id}`);
                return res.status(200).send({ text: "Email updated successfully.", newEmail });
            }
        } else {
            return res.status(409).send({ text: "Invalid verification code." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ text: "Internal server error." });
    }
});

function redisGet(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
function redisDel(key) {
    return new Promise((resolve, reject) => {
        redisClient.del(key, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

router.put('/update/CustomID', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { customID } = req.body;
    console.log(customID);
    try {
        const existID = await prisma.user.count({
            where: {
                user_custom_id: customID,
            }
        })
        if (existID) {
            return res.status(405).send({ text: "the ID already in used" });
        } else {
            const updatePhone = await prisma.user.update({
                where: {
                    user_id: user_id,
                },
                data: {
                    user_custom_id: customID,
                }
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(403).send({ text: "error while update user ID" });
    }
    res.status(200).send({ text: 'ID has Changed' });
});

router.put('/update/relations', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { newRelation, FriendID } = req.body;
    const RelationList = { Friend: 1, Favorite: 2, Require: 3 };
    const io = require('./../../index.js');

    if (Object.values(RelationList).includes(newRelation)) {
        let update = []
        let FriendData = {}
        let UserData = {}
        try {
            const findRelation = await prisma.friends_relationship.findFirst({
                where: {
                    OR: [
                        {
                            fk_user_one: user_id,
                            fk_user_two: FriendID
                        },
                        {
                            fk_user_one: FriendID,
                            fk_user_two: user_id
                        }
                    ]
                },
            })
            console.log(findRelation)
            update = await prisma.friends_relationship.update({
                where:
                {
                    fk_user_one_fk_user_two: {
                        fk_user_one: findRelation.fk_user_one,
                        fk_user_two: findRelation.fk_user_two
                    }

                },
                data: {
                    relation_status: newRelation
                }
            });
            FriendData = await prisma.user.findFirst({
                where: {
                    user_id: FriendID,
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
            UserData = await prisma.user.findFirst({
                where: {
                    user_id: user_id,
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

        } catch (err) {
            console.log(err);
        }
        if (newRelation === RelationList.Friend && checkOnline(FriendID)) {
            io.to(FriendID).emit('upDateRelation', { update, UserData });
        }
        io.to(user_id).emit('upDateRelation', { update, FriendData });
        return res.status(200).send({ text: 'Update Status Success', newRelation: update, FriendData });

    } else if (newRelation === 0) {
        let newBlockedRelation = [];
        try {
            const Blocked = await prisma.friends_relationship.deleteMany({
                where: {
                    OR: [
                        {
                            fk_user_one: user_id,
                            fk_user_two: FriendID
                        },
                        {
                            fk_user_one: FriendID,
                            fk_user_two: user_id
                        }
                    ]
                }
            })
            if (Blocked) {
                newBlockedRelation = await prisma.friends_relationship.create({
                    data: {
                        fk_user_one: user_id,
                        fk_user_two: FriendID,
                        relation_status: 0
                    }
                })
            }
            res.status(200).send({ text: 'Blocked Status Success', newRelation: newBlockedRelation });

        } catch (err) {
            console.log(err);
            res.status(400).send({ text: 'Block has FAil!' });
        }
    } else if (newRelation === -1) {
        try {
            const deleteRelation = await prisma.friends_relationship.deleteMany({
                where: {
                    OR: [
                        {
                            fk_user_one: user_id,
                            fk_user_two: FriendID
                        },
                        {
                            fk_user_one: FriendID,
                            fk_user_two: user_id
                        }
                    ]
                }
            });
            res.status(200).send({ text: 'Delete Status Success' });
            console.log(deleteRelation);
        } catch (err) {
            console.log(err);
            res.status(400).send({ text: 'Delete relation status has FAil!' });
        }
    } else {
        res.status(400).send({ text: 'Invalid relation status' });
    }

});

router.put('/create/relations', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { FriendID } = req.body;
    let create_relation = {};
    let FriendData = {};
    let UserData = {};
    const io = require('./../../index.js');

    if (FriendID !== null && FriendID !== undefined) {
        try {
            create_relation = await prisma.friends_relationship.create({
                data: {
                    fk_user_one: user_id,
                    fk_user_two: FriendID,
                    relation_status: 3
                }
            });
            FriendData = await prisma.user.findFirst({
                where: {
                    user_id: FriendID,
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
            UserData = await prisma.user.findFirst({
                where: {
                    user_id: user_id,
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
            console.log(create_relation);
        } catch (error) {
            return res.status(403).send({ text: 'Friend Request Error' });
        }
    } else {
        return res.status(400).send({ text: 'Undefined Friend Request Error' });
    }

    if (checkOnline(FriendID)) {
        io.to(FriendID).emit('newRelation', { FriendData: UserData, create_relation });
    }

    return res.status(200).send({ FriendData, create_relation });
});

router.put('/update/MessageStatus', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { newStatus, msg_id } = req.body;
    console.log(0)
    const MSG_Status = { delete: 1, Unsend: 2 };
    if (Object.values(MSG_Status).includes(newStatus)) {
        try {
            const updateMSG = await prisma.msg_user_reply.findFirst({
                where: {
                    msg_reply_id: msg_id,
                }
            })
            if (updateMSG) {
                let data = {}
                if (updateMSG.fk_user_owner === user_id) {
                    data = {
                        msg_status_owner: newStatus,
                    }
                } else if (updateMSG.fk_user_owner !== user_id && newStatus === 1) {

                    data = {
                        msg_status_other: newStatus,
                    }
                } else {
                    return res.status(403).send({ text: "the new MSG Status has invalid" });
                }
                const updatedMessage = await prisma.msg_user_reply.update({
                    where: {
                        msg_reply_id: msg_id,
                    },
                    data
                });
                return res.status(200).send({ text: 'Message status has Changed' });
            } else {
                return res.status(405).send({ text: "Message not Found" });
            }
        } catch (err) {
            console.log(err);
            return res.status(403).send({ text: "error while update Message Status" });
        }
    } else {
        return res.status(403).send({ text: "invalid message status" });
    }
});

router.put('/update/ChatStatus', verify_TOKEN, async (req, res) => {
    try {
        const { user_id } = req.user;
        const { newChatStatus, cid } = req.body;
        console.log(newChatStatus);
        const StatusList = { nomal: 0, pin: 1, Delete: 3 };
        if (Object.values(StatusList).includes(newChatStatus)) {
            const existChat = await prisma.chat_user.findFirst({
                where: {
                    chat_id: cid,
                }
            });
            if (existChat) {
                if (newChatStatus !== StatusList.Delete) {
                    let data = {}
                    if (existChat.chat_user_one === user_id) {
                        data = { chat_status_one: newChatStatus };
                    } else {
                        data = { chat_status_two: newChatStatus };
                    }
                    const UpdateChat = await prisma.chat_user.update({
                        where: {
                            chat_id: cid,
                        },
                        data
                    });
                    return res.status(200).send({ text: "Chat Status has Changed" });
                } else {
                    const MSG_StatusList = { normal: 0, delete: 1, Unsend: 2 };
                    ///Change All msg In Chat to

                    const updateMSGStatus = await prisma.msg_user_reply.updateMany({
                        where: {
                            fk_chat_id: cid,
                            OR: [
                                { fk_user_owner: user_id, },
                            ],
                        },
                        data: {
                            msg_status_owner: {
                                set: MSG_StatusList.delete,
                            },
                        },
                    });
                    const updateMSGStatus2 = await prisma.msg_user_reply.updateMany({
                        where: {
                            fk_chat_id: cid,
                            OR: [
                                { fk_user_owner: { not: user_id } },
                            ],
                        },
                        data: {
                            msg_status_other: {
                                set: MSG_StatusList.delete,
                            },
                        },
                    });
                    return res.status(200).send({ text: "All message Has Deleted" });
                }
            } else {
                return res.status(403).send({ text: "Chat not Found" });
            }
        } else {
            return res.status(403).send({ text: "invalid User Input" });
        }

    } catch (err) {
        console.log(err);
        return res.status(403).send({ text: "error while update All MSG in chat" });
    }
});


module.exports = router;