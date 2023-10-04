const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const {createAccountPost} = require('./routes/signup.js');
const {loginPost} = require('./routes/signin.js');
const {authenticateToken} = require('./routes/reAuthenticateToken.js');

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.listen(8080, console.log("listening on port 8080"));


// // Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL);


app.get('/', (req, res) => {
  res.render("home.ejs")
})

app.get("/test",authenticateToken, (req, res) => {
  try {
    connection.query(`SELECT * FROM users WHERE email = '${req.email.email}'`, async function (err, results, fields) {
      console.log(results)
      console.log(req.email)
    })
  }
  catch(err) {
    console.log(err)
  }
  res.json()
})

app.get("/profile", (req, res) => {
  res.redirect("/login")
})

app.get("/create-account", (req, res) => {
  res.render("create-account")
})

app.post("/create-account", createAccountPost);

app.get("/login", (req, res) => {
  res.render("login.ejs")
})

app.post("/login", loginPost)

app.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.redirect("/")
})

app.get("/reset-password", (req, res) => {
  res.render("reset-password")
})

app.post("/reset-password", (req, res) => {
  const token = jwt.sign({email: req.body.email, type: req.body.type}, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
    res.cookie("token", token, {
      httpOnly: true,
    })
    res.status(201).json({
    status: "password match",
    token: token,
    })
    console.log(token)
    console.log(req.body.type)
  }
)

app.get("/new-booking", (req, res) => {
  res.send("booking")
})

app.get("/database-testing", (req, res) => {
  connection.query(`SELECT * FROM users`, function (err, results, fields) {
    nameAns = results[0].name
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
