const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config()

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));

app.listen(8080, console.log("listening on port 8080"))

// // Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
  res.render("home.ejs")
})

app.get("/hello", (req, res) => {
  res.send("Hello World");
})

app.get("/new-booking", (req, res) => {
  res.send("booking")
})

app.get("/database-testing", (req, res) => {
  connection.query(`SELECT * FROM users`, function (err, results, fields) {
    nameAns = results[0].name
    console.log(results[1].name) // results contains rows returned by server
    console.log(fields) // fields contains extra metadata about results, if available
    console.log(results)
    res.send(nameAns)
  })
  connection.end()
})



//PlanetScale Database connection

// require('dotenv').config()

// // const mysql = require('mysql2')


// // simple query
// connection.query(`SELECT * FROM users`, function (err, results, fields) {
//   console.log(results) // results contains rows returned by server
//   console.log(fields) // fields contains extra metadata about results, if available
//   console.log(results)
// })

// // Example with placeholders
// // connection.query('select 1 from dual where ? = ?', [1, 1], function (err, results) {
// //   console.log(results)
// // })

// connection.end()
