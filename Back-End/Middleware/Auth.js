const jwt = require('jsonwebtoken');
require('dotenv').config();

const PRIVATE_TOKEN_KEY = process.env.PRIVATE_TOKEN_KEY;

function verify_TOKEN(req, res, next) {
    const PUBLIC_TOKEN_KEY = req.headers['access-token-key'] || req.body.token;
    if (!PUBLIC_TOKEN_KEY) return res.status(403).send("a token is require for Authentication!");
    try {
        const decoded = jwt.verify(PUBLIC_TOKEN_KEY, PRIVATE_TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        data = {text: "Invalid Token!", route: '/login'};
        res.status(401).send({...data});
    }
    return next();
}

module.exports = verify_TOKEN;