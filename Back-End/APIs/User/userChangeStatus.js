const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const verify_TOKEN = require('../../middleware/Auth.js');


router.put('/update/name', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { newName } = req.body;
    console.log(newName);
    try {
        const updatename = await prisma.user.update({
            where: {
                user_id: user_id
            },
            data: {
                user_name: newName
            }
        });
        console.log(updatename);
    } catch (err) {
        console.log(err);
    }
    res.send('Name has Changed');
});



module.exports = router;