const jwt = require('jsonwebtoken');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PRIVATE_TOKEN_KEY = process.env.PRIVATE_TOKEN_KEY;

async function verify_TOKEN(req, res, next) {
    const PUBLIC_TOKEN_KEY = req.headers['access-token-key'] || req.body.token;
    if (!PUBLIC_TOKEN_KEY) {
        data = { text: "api a token is require for Authentication!", route: '/login' };
        console.log(data);
        return res.status(403).send({ ...data });
    }
    try {
        const decoded = jwt.verify(PUBLIC_TOKEN_KEY, PRIVATE_TOKEN_KEY);
        req.user = decoded;
        if (decoded?.user_id) {
            const isSuspended = await CheckSuspend(res, decoded.user_id);
            if (isSuspended) {
                return;
            }
        }
    } catch (err) {
        data = { text: "Invalid Token!", route: '/login' };
        return res.status(401).send({ ...data });
    }
    return next();
}

module.exports = verify_TOKEN;

async function CheckSuspend(res, user_id) {
    const Suspend = await prisma.userSuspendedList.findFirst({
        where: {
            user_id: user_id,
        }
    });
    if (Suspend) {
        if (hasTimePassed(Suspend.suspended_expire)) {
            const DeleteSuspended = prisma.userSuspendedList.deleteMany({
                where: {
                    user_id: user_id
                }
            });
        } else {
            res.status(403).send({
                text: "User Has Suspended",
                expiresIn: Suspend.suspended_expire,
                suspendAt: Suspend.suspended_created_at,
                route: '/Auth',
            });

            return true;
        }
    }
    return false;
}

function hasTimePassed(timeString) {
    const targetTime = new Date(timeString);
    const currentTime = new Date();
    return currentTime > targetTime;
}