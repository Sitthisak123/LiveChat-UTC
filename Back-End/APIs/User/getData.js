const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const verify_TOKEN = require('../../middleware/Auth.js');


router.post('/FindByUnique', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { findBy, unique } = req.body;
    const findBy_filtered = findBy.trim();
    var findByUnique = null;
    try {
        if(findBy_filtered === 'Phone'){
            findByUnique = await prisma.user.findFirst({
                where: {
                    user_phone: unique
                }
            });
        }else if(findBy_filtered === 'E-Mail'){
            findByUnique = await prisma.user.findFirst({
                where: {
                    user_email: unique
                }
            });
        }else if(findBy_filtered === 'ID'){
            findByUnique = await prisma.user.findFirst({
                where: {
                    user_custom_id: unique
                }
            });
        }else if(findBy_filtered === null || findBy === undefined){
            res.status(400).send('error');
        }
        console.log(findByUnique);
    } catch (err) {
        console.log(err);
        res.status(400).send('error');
    }
    if(findByUnique){
        const data = {Text: 'Find Success',users: findByUnique}
        console.log(data)
        res.status(200).send(data);
    }else{
        const data = {text: 'Not Found'}
        res.status(404).send(data);
    }
});

module.exports = router;