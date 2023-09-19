const mysql = require('mysql2');
const express = require('express');
const app = express();

app

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '#',
  database: 'hotel'
});

// simple query
connection.query(
  'SELECT * FROM room',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);