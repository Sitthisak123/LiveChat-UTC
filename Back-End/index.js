const app = require('./app.js');
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_SOCKET_API,
      process.env.CLIENT_SOCKET_DASHBORD_API,
    ],
    methods: ["GET", "POST"]
  }
});

module.exports = io;

const socketEvents = require('./APIs_socket/SocketEvent.js');

socketEvents(io);

require('dotenv').config();

const PORT = process.env.API_PORT;
const IP_ADDRESS = process.env.API_IP || 'localhost';

server.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server listening on http://${IP_ADDRESS}:${PORT}`);
});
