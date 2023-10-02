const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path')
require('dotenv').config()

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.listen(8080, console.log("listening on port 8080"))

// // Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL)



let errMessage = "Account already exists";
let accountExists = false;


app.get('/', (req, res) => {
  res.render("home.ejs")
})

app.get("/test", (req, res) => {
  res.type('application/json')
  res.header({test: "Hello World"})
  res.send("Hello World")
  // res.send(`alert("your alert message"); window.location.href = "/page_location"; `);
})

app.get("/profile", (req, res) => {
  res.redirect("/login")
})

app.get("/create-account", (req, res) => {
  res.render("create-account", {errMessage: errMessage, accountExists: accountExists})
  // accountExists = false;
})

app.post("/create-account", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    connection.query(`INSERT INTO users (name, email, password) VALUES ("${req.body.name}", "${req.body.email}", "${hashedPassword}")`, function (err, results, fields) {
      console.log(results) // results contains rows returned by server
      console.log(fields) // fields contains extra metadata about results, if available
      console.log(err)
      if(err.code == "ER_DUP_ENTRY") {
        res.redirect("/create-account")
      }
    })
    connection.end()
    // res.send("success")
    // res.redirect("/login")
  }
  catch {
    res.redirect("/create-account")
  }
  // connection.query(`SELECT * FROM users`, function (err, results, fields) {
  //   nameAns = results[0].name
  //   console.log(nameAns)
  //   console.log(fields)
  //   console.log(results)
  //   res.send(nameAns)
  // })
  // connection.end()
})

app.get("/login", (req, res) => {
  res.render("login.ejs")
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
