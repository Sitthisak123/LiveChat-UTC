const socket_massage = require('../APIs_socket/User/massage.js');
const socket_status = require('../APIs_socket/User/status.js');
const verify_socket_TOKEN = require('../middleware/Auth-socket.js');
const redis = require('redis');

const client = redis.createClient();

// client.on('ready', () => {
//   console.log('Redis client connected');
// });


module.exports = (io) => {
  io.use((socket, next) => {
    verify_socket_TOKEN(socket, null, (err) => {
      if (err) return next(new Error('Authentication error'));
      return next();
    });
  });

  io.on('connection', (socket) => {
    const user_id = socket.user.user_id;
    const socket_id = socket.id;
    console.log(`\n------------------------------\nA user connected ID: ${user_id} ${socket_id}\n------------------------------`);
    client.sadd("online_users", user_id)
    client.hincrby("user_connections", user_id, 1);
    socket.join(user_id);

    socket.on('test', (data) => {
      console.log('on test>>>>>>>>>>>>>>')
      io.to(user_id).emit('test', 'data123');
    })


    socket.on('disconnect', () => {
      console.log('A user disconnected');
      client.srem("online_users", user_id)
      client.hincrby("user_connections", user_id, -1);
      const countSessions = client.hget("user_connections", user_id);
      if (!countSessions) {
        client.hdel("user_connections", user_id);
      }
      showOnline(io);
    });

    socket_massage(io, socket, user_id);
    socket_status(io, socket, user_id);
    showOnline(io);
  });
}

function showOnline(io) {
  client.scard("online_users", (err, count) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Number of online users: ${count}`);
      io.emit('Update-onlineUser', count);
    }
  });

  client.hvals("user_connections", (err, values) => {
    if (err) throw err;
    let totalConnections = 0;
    values.forEach(function (value) {
      totalConnections += parseInt(value);
    });

    console.log("Total connections: " + totalConnections);
  });
}