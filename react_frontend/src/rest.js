const express = require('express')
const mysql = require('mysql')
var http = require('http')

// Database Sample
const db = mysql.createConnection({
  host     : 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
  user     : 'username',
  password : 'password',
  database : 'challengerDb1',
  port: '3306'
})
db.connect((err) => {
  if(err){
    throw err
  }
  console.log('mysql connected')
})
let app = express()

app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

var options = {
  hostname: 'weebwork.c4juqjnoarlo.us-east-2.rds.amazonaws.com',
  port: '3306'
}

var req = http.requirest()