const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const verify_TOKEN = require('../../middleware/Auth.js');


router.put('/user/FindByUnique', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { Findby, Unique } = req.body;
    var findByUnique = null;
    try {
        if(Findby === 'Phone'){
            findByUnique = await prisma.user.findFirst({
                where: {
                    user_phone: Unique
                }
            });
        }else if(Findby === 'E-Mail'){
            findByUnique = await prisma.user.findFirst({
                where: {
                    user_phone: Unique
                }
            });
        }else if(Findby === 'ID'){
            findByUnique = await prisma.user.findFirst({
                where: {
                    user_phone: Unique
                }
            });
        }
        
    } catch (err) {
        console.log(err);
        res.status(400).send('error');
    }
    res.status(200).send('success');
});
