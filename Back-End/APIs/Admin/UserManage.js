const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const verify_TOKEN = require('../../middleware/Auth.js');

router.post("/Update-User", verify_TOKEN, async (req, res) => {
    try {
        const { FieldsData, user_id } = req.body;
        const UpdateFields = FieldsData.map((field) => {
            switch (field.keyitem) {
                case 1:
                    return { user_custom_id: field.FieldData };
                case 2:
                    return { user_name: field.FieldData };
                case 3:
                    return { user_password: field.FieldData };
                case 4:
                    return { user_email: field.FieldData };
                case 5:
                    return { user_phone: field.FieldData };
                default:
                    return null;
            }
        })
        const data = UpdateFields.reduce((acc, curr) => {
            const key = Object.keys(curr)[0];
            acc[key] = curr[key];
            return acc;
        }, {});

        const Update = await prisma.user.update({
            where: { user_id },
            data
        });
        res.status(200).send({ text: `UserID ${user_id} has Updated` })
    } catch (err) {
        console.log(err);
        res.status(403).send({ text: "Something Error while Update User", route: 'Login' });
    }
})

router.post("/Delete-User", verify_TOKEN, async (req, res) => {
    try {
        const { user_id } = req.body;
        console.log(user_id);
        const deleteUser = await prisma.user.delete({
            where: {
                user_id: user_id,
            }
        });
        res.status(200).send({ text: "User has Deteled" });
    } catch (err) {
        console.log(err);
        res.status(403).send({ text: "Something Error while request All User Data", route: 'Login' });
    }
})
router.post("/Suspend-User", verify_TOKEN, async (req, res) => {
    try {
        const moment = require('moment');
        const { user_id, expireDateTime } = req.body;
        const suspended_expire = moment(expireDateTime, 'DD/M/YYYY HH:mm:ss').toISOString();
        const banUser = await prisma.UserSuspendedList.create({
            data: {
                user_id: user_id,
                // suspended_description: null,
                suspended_permanent: false,
                suspended_expire: suspended_expire,
            }
        });
        if (banUser) {
            console.log(`Baned -> ${user_id}`);
            return res.status(200).send({ text: `User ID ${user_id} has Baned` });
        }
        res.status(200).send({ text: "User has not Baned" });
    } catch (err) {
        console.log(err);
        res.status(403).send({ text: "this User Has Already Baned", route: 'Login' });
    }
})


module.exports = router;