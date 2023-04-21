const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const verify_TOKEN = require('../../middleware/Auth.js');

router.post("/User-validate", verify_TOKEN, async (req, res) => {
    try {
        const { itemKey, itemData } = req.body;
        console.log(`${itemKey} ${itemData}`);
        let validate = true;
        switch (itemKey) {
            case 1:
                const check_User_Custom_id = await prisma.user.count({
                    where: { user_custom_id: itemData }
                });
                if (check_User_Custom_id) {
                    validate = false;
                }
                break;
            case 2:

                break;
            case 3:

                break;
            case 4:
                const check_User_email = await prisma.user.count({
                    where: { user_email: itemData }
                });
                if (check_User_email) {
                    validate = false;
                }
                break;
            case 5:
                const check_User_phone = await prisma.user.count({
                    where: { user_phone: itemData }
                });
                if (check_User_phone) {
                    validate = false;
                }
                break;
            default:
                break;
        }
        res.status(200).send(validate);
    } catch (err) {
        console.log(err);
        res.status(403).send({ text: "Something Error while validate Data", route: '/Login' });
    }
})
module.exports = router;