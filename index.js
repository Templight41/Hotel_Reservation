const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// import createAccountPost from './routes/createPost.js';

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



// let errMessage = "Account already exists";
// let accountExists = false;


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
  res.render("create-account")
})

app.post("/create-account", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    connection.query(`INSERT INTO users (name, email, password) VALUES ("${req.body.name}", "${req.body.email}", "${hashedPassword}")`, function (err, results, fields) {
      console.log(results) // results contains rows returned by server
      console.log(fields) // fields contains extra metadata about results, if available
      console.log(err)
      if(err != null) {
        res.status(200).json({status: "Account already exists"})
        // console.log(err)
        // res.send("Account already exists")
      } else {
        const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie("token", token, {
          httpOnly: true,
        })
        res.status(201).json({
          status: "success",
          token: token,
        })
      }
    })
    
  }
  catch(err) {
    console.log(err)
  }
})

app.get("/login", (req, res) => {
  res.render("login.ejs")
})

app.post("/login", async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10)
    connection.query(`SELECT email FROM users WHERE email = '${req.body.email}'`, function (err, results, fields) {
      try {
        if(results[0].email == `${req.body.email}`) {
          res.status(200).json({ status : "user exists" });
          

        }else {
          res.status(200).json({status: "user not found"});
        }
      }
      catch {
        res.status(200).json({status: "user not found"});
      }
      // if(err != null) {
      //   res.status(200).json({status: "Account already exists"})
      //   // console.log(err)
      //   // res.send("Account already exists")
      // } else {
      //   const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      //   res.cookie("token", token, {
      //     httpOnly: true,
      //   })
      //   res.status(201).json({
      //     status: "success",
      //     token: token,
      //   })
      // }
    })
  }
  catch(err) {
    // console.log(err)
  }
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
