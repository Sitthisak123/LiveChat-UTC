const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'online-chat_db'
})

app.listen('9000', () => {
  console.log(`O.K. server is running on port 9000\n`)
  /*
  db.query("SELECT * FROM user", (err, result) => {
    if(err){
      console.log(err)
    }else{
      console.log(result)
    }
  })
  */
})
app.get("/getalluser",(req,res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if(err){
      console.log(err)
    }else{
      console.log(`->Get all User -> ${Date.now()}`)
      res.send(result)
    }
  })
})
app.post("/uploadfile",(req,res) => {
  console.log('->: uploadFile\n')
  res.send('<h1>hello</h1>')
})