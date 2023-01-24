const app = require('./app.js');

const http = require('http');
const server = http.createServer(app);

require('dotenv').config(); 


///-> SetUp <-///
 const PORT = process.env.API_PORT;
/////////////////
server.listen(PORT, () => {
  console.log(`O.K. server is running on port ${PORT}\n`)
}) 