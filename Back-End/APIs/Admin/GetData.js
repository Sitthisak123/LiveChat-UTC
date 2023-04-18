const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const verify_TOKEN = require('../../middleware/Auth.js');

router.post("/GetAllUser", verify_TOKEN, async (req, res) => {
    try {
        const AllUserData = await prisma.user.findMany();
        const data = { AllUserData };
        res.status(200).send(data)
    } catch (err) {
        console.log(err);
        res.status(403).send({text: "Something Error while request All User Data", route: 'Login'});
    }
})
module.exports = router;