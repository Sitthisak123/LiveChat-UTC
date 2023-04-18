const app = require('./app.js');
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"]
  }
});

const socketEvents = require('./APIs_socket/SocketEvent.js');

socketEvents(io);

require('dotenv').config();

const PORT = process.env.API_PORT;
const IP_ADDRESS  = process.env.API_IP || '127.0.0.1';

server.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server listening on http://${IP_ADDRESS}:${PORT}`);
});
