const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const verify_TOKEN = require('../../middleware/Auth.js');

router.post("/init", verify_TOKEN, async (req, res) => {
    try {
        const { admin_id } = req.user;
        const admin = await prisma.admin.findFirst({
            where: {
                admin_id: admin_id
            }, select:
            {
                admin_id: true,
                admin_username: true,
                admin_password: false,
                admin_email: true,
                admin_phone: true,
                admin_name: true,
                admin_profile_img: true,
                admin_cover_img: true,
                admin_role: true,
            }
        });
        const data = { admin_data: admin };
        res.status(200).send(data)
    } catch (err) {
        console.log(err);
        res.status(403).send({text: "Something Error while request Init data", route: 'Login'});
    }
})
module.exports = router;