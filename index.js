// const mysql = require('mysql2');
const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Razorpay = require('razorpay');
let instance = new Razorpay({ key_id: process.env.RAZORPAY_ID, key_secret: process.env.RAZORPAY_KEY })

// let options = {
//   amount: 50000,  // amount in the smallest currency unit
//   currency: "INR",
//   receipt: "order_rcptid_11"
// };
// instance.orders.create(options, function(err, order) {
//   console.log(order);
// });


const {createAccountPost} = require('./routes/signup.js');
const {loginPost} = require('./routes/signin.js');
const {resetPasswordPost} = require('./routes/resetPasswordEmail.js');
const {authenticateToken} = require('./routes/authenticateToken.js');
const {resetTokenGet} = require('./routes/resetPasswordTokenGet.js');
const {resetTokenPost} = require('./routes/resetPasswordTokenPost.js');
const {verifiedLogin} = require('./routes/verifiedLogin.js');
const {bookingNewSelect} = require('./routes/bookingNewSelect.js')
const {selectedRoomDetails} = require('./routes/selectedRoomDetails.js');
const {paymentSuccess} = require("./routes/paymentSuccess.js")
const {profileData} = require("./routes/profileData.js");
const { deleteBooking } = require('./routes/deleteBooking.js');

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


app.listen(8080, console.log("listening on port 8080"));


// Create the connection to the database
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);


app.get('/', (req, res) => {
  res.render("home.ejs")
})

app.get("/profile", authenticateToken, profileData, (req, res) => {
  // console.log(req.email)
  res.render("profile", {user: req.locals});
})

app.get("/create-account", verifiedLogin, (req, res) => {
  res.render("create-account")
})

app.post("/create-account", createAccountPost);

app.get("/login", verifiedLogin, (req, res) => {
  res.render("login.ejs")
})

app.post("/login", loginPost)

app.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.redirect("/")
})

app.get("/refresh", verifiedLogin, (req, res) => {
  if(!req.cookies.token) console.log(req.locals)
  else {
    console.log(req.locals)
  }
  res.send("yes")
})

app.get("/reset-password", (req, res) => {
  res.render("reset-password", {emailSent: false, tokenStatus: undefined, errorMessage: ""})
})

app.post("/reset-password", resetPasswordPost);

app.get("/reset-password/:token", resetTokenGet)

app.post("/reset-password/:token", resetTokenPost)

app.get("/booking/new", authenticateToken, bookingNewSelect, (req, res) => {
  res.render("booking", {rooms: req.locals});
})

app.delete("/booking/:orderid", authenticateToken, deleteBooking)

app.post("/booking/room", bookingNewSelect, (req, res) => {
  res.json({room : req.locals})
})

app.get("/booking/test", (req, res) => {
  res.render("bookingtest.ejs")
})

app.post("/booking/pay/:roomid/:members/:nights", selectedRoomDetails, (req, res) => {
  let options = {
    amount: `${req.locals[0].price*parseInt(req.params.members)*parseInt(req.params.nights)}00`,  // amount in the smallest currency unit
    currency: "INR",
    receipt: `order_rcptid_${req.locals[0].id}`
  };
  instance.orders.create(options, function(err, order) {
    res.json({
      orderId: order.id,
      amount: order.amount
    })
  });

})

app.post("/booking/success", paymentSuccess)

// app.get("/booking/success", paymentSuccess)

app.get("/booking/:any", (req, res) => {
  res.redirect("/booking/new")
})

app.get("/database-testing", (req, res) => {
  const { data, error } = supabase
    .from('users')
    .select()
  res.send("database is working")
})

app.get("/:any", (req, res) => {
  res.redirect("/")
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


