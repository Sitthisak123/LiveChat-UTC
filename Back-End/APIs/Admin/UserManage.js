const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const verify_TOKEN = require('../../middleware/Auth.js');

router.post("/User-update", verify_TOKEN, async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(403).send({ text: "Something Error while request All User Data", route: 'Login' });
    }
})

router.post("/Delete-User", verify_TOKEN, async (req, res) => {
    try {
        const { user_id } = req.body;
        console.log(user_id);
        res.status(200).send({text: "User has Deteled"});
    } catch (err) {
        console.log(err);
        res.status(403).send({ text: "Something Error while request All User Data", route: 'Login' });
    }
})
module.exports = router;