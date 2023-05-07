const express = require('express');
const cors = require('cors');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const verify_TOKEN = require('./middleware/Auth.js');
const API_login = require('./APIs/User/login.js');
const API_register = require('./APIs/User/register.js');
const API_conversion = require('./APIs/User/Init.js');
const API_getImage = require('./APIs/User/getImage.js');
const API_update = require('./APIs/User/userChangeStatus.js');
const API_getData = require('./APIs/User/getData.js');
const API_Chats = require('./APIs/User/chats.js');
const API_service = require('./APIs/User/services.js');
const API_MSGFile = require('./APIs/User/uploadMSG.js');

// Admin APIs
const admin_API_login = require('./APIs/Admin/login.js');
const admin_API_init = require('./APIs/Admin/Init.js');
const admin_API_getData = require('./APIs/Admin/GetData.js');
const admin_API_checkData = require('./APIs/Admin/checkData.js');
const admin_API_userManage = require('./APIs/Admin/UserManage.js');

app.use(cors());
app.use(express.static('assets'));
app.use(express.json());

const APIs_Endpoint_user = '/API/user';
app.use(APIs_Endpoint_user, API_login);
app.use(APIs_Endpoint_user, API_register);
app.use(APIs_Endpoint_user, API_conversion);
app.use(APIs_Endpoint_user, API_getImage);
app.use(APIs_Endpoint_user, API_update);
app.use(APIs_Endpoint_user, API_getData);
app.use(APIs_Endpoint_user, API_Chats);
app.use(APIs_Endpoint_user, API_service);
app.use(APIs_Endpoint_user, API_MSGFile);

const APIs_Endpoint_admin = '/API/admin';
app.use(APIs_Endpoint_admin, admin_API_login);
app.use(APIs_Endpoint_admin, admin_API_init);
app.use(APIs_Endpoint_admin, admin_API_getData);
app.use(APIs_Endpoint_admin, admin_API_checkData);
app.use(APIs_Endpoint_admin, admin_API_userManage);

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Additional server configurations and routes...

module.exports = app;
