function checkOnline(user_id) {
    const redis = require('redis');
    const client = redis.createClient();
    return new Promise((resolve, reject) => {
        client.sismember("online_users", user_id, (err, isOnline) => {
            if (err) throw err;
            if (isOnline) {
                console.log('>>>>>>>>>>>>>>>>>> online');
                resolve(true);
            }
            else {
                console.log('>>>>>>>>>>>>>>>>>> offline');
                resolve(false);
            }
        });
    });
}

module.exports = checkOnline;
