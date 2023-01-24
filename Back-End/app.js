const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./_config/dataBase.js');
app.use(cors());
app.use(express.json());

///-> Test Data <-///
const USER_ID = 1;
////////////////ฝ



app.get("/getalluser", (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            //console.log(`->Get all User -> ${Date.now()}`)
            console.log(result.length)
            res.send(result)
        }
    })
})

app.get("/API/user/chat/chat_all", (req, res) => {
    db.query(`SELECT * FROM chat_user WHERE chat_user_one = ${USER_ID}`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result.length)
            res.send(result)
        }
    })
})


//// USER REGISTER ////
app.post("/API/user/register", (req, res) => {
    try {
        const { Username, Password, Email } = req.body;
        if (!(Username && Password && Email)) {
            return res.status(400).send(`All input is required!!!`);
        }
        db.query(`SELECT * FROM user WHERE user_username = '${Username}' OR user_email = '${Email}'`, (err, result) => {
            try {
                if (err) {
                    throw err;
                }
                if (result.length) {
                    res.status(409).send("User already exist.");
                } else {
                    db.query(`INSERT INTO user (user_username, user_email, user_password) VALUE('${Username}', '${Email}', '${Password}')`, (err, result) => {
                        if (err) throw err;
                        console.log(`Inserted ${result.affectedRows} row(s) | use: ${Username}`);
                        res.status(201).send("Register Success!!");
                    })
                }
            } catch (err) {
                console.log(err);
            }
        })
    } catch (err) {
        console.log(err);
    }
})


//// USER Login ////
app.post("/API/user/login", (req, res) => {
    try {
        const { Username, Password } = req.body;
        if (!(Username && Password)) {
            return res.status(400).send(`All input is required!!!`);
        }
        db.query(`SELECT * FROM user WHERE (user_username = '${Username}' OR user_email = '${Username}') AND user_password = '${Password}'`, (err, result) => {
            try {
                if (err) {
                    throw err;
                }
                if (result.length) {
                    res.status(201).send("Login Success!!");
                } else {
                    res.status(409).send("User not found.");
                }
            } catch (err) {
                console.log(err);
            }
        })
    } catch (err) {
        console.log(err);
    }
})
module.exports = app;