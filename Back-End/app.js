const express = require('express');
const cors = require('cors');
const app = express();


const verify_TOKEN      = require('./middleware/Auth.js');
const API_login         = require('./APIs/User/login.js');
const API_register      = require('./APIs/User/register.js');
const API_conversion    = require('./APIs/User/Init.js');
const API_getImage      = require('./APIs/User/getImage.js');
const API_update        = require('./APIs/User/userChangeStatus.js');


app.use(cors());
app.use(express.json());
const APIs_Endpoint_user = '/API/user';
app.use(APIs_Endpoint_user, API_login);
app.use(APIs_Endpoint_user, API_register);
app.use(APIs_Endpoint_user, API_conversion);
app.use(APIs_Endpoint_user, API_getImage);
app.use(APIs_Endpoint_user, API_update);


// app.post("/API/token/test", verify_TOKEN, (req, res) => {
//     res.status(201).send('TOKEN is work! congratulations!!');
// })

module.exports = app; 