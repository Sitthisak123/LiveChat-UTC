const jwt = require('jsonwebtoken');
require('dotenv').config();

const PRIVATE_TOKEN_KEY = process.env.PRIVATE_TOKEN_KEY;

function verify_socket_TOKEN(req, res, next) {
    console.log('verify_socket >>>');
    const PUBLIC_TOKEN_KEY = req.handshake.headers['access-token-key'];
    if (!PUBLIC_TOKEN_KEY){
        console.log('a token is require for Authentication!');
        data = {text: "a token is require for Authentication!", route: '/login'};
        return
    }
    try {
        const decoded = jwt.verify(PUBLIC_TOKEN_KEY, PRIVATE_TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        console.log('Fail')
        data = {text: "Invalid Token!", route: '/login'};
        return
    }
    return next();
}

module.exports = verify_socket_TOKEN;