const express = require('express');
const cors = require('cors');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

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

// socketEvents(io);

app.use(cors());
app.use(express.json());
const APIs_Endpoint_user = '/API/user';
app.use(APIs_Endpoint_user, API_login);
app.use(APIs_Endpoint_user, API_register);
app.use(APIs_Endpoint_user, API_conversion);
app.use(APIs_Endpoint_user, API_getImage);
app.use(APIs_Endpoint_user, API_update);
app.use(APIs_Endpoint_user, API_getData);
app.use(APIs_Endpoint_user, API_Chats);


// app.post("/API/token/test", verify_TOKEN, (req, res) => {
//     res.status(201).send('TOKEN is work! congratulations!!');
// })

// app.post("/API/token/test", async (req, res) => {
//     const my_id = 1;
//     const friend_id = 2;
//     const user = await prisma.user.findUnique({
//         where: {
//             user_id: friend_id,
//         },
//         include: {
//             friends_relationship_friends_relationship_fk_user_twoTouser: {
//                 select: {
//                     relation_status: true,
//                 },
//                 where: {
//                     OR: [
//                         {
//                             fk_user_one: my_id,
//                             fk_user_two: friend_id,
//                         },
//                         {
//                             fk_user_one: friend_id,
//                             fk_user_two: my_id,
//                         },
//                     ],
//                 },
//             },
//         },
//     });

//     res.status(201).send(user);
// })
module.exports = app; 