const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));

app.listen(8080, console.log("listening on port 8080"))

// create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '#',
//   database: 'hotel'
// });

// simple query
// connection.query(
//   'SELECT * FROM room',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );



app.get('/', (req, res) => {
  res.render("home.ejs")
})
