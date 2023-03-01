const app = require('./app.js');
const http = require('http');
const server = http.createServer(app);

require('dotenv').config(); 


///-> SetUp <-///
 const PORT = process.env.API_PORT;
 const IP_ADDRESS  = process.env.API_IP || '127.0.0.1';
/////////////////
server.listen(PORT,null, () => {
  console.log(`O.K. server is running on ${IP_ADDRESS}:${PORT}\n`)
}) 