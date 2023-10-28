const mysql = require('mysql2');
require('dotenv').config();

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL);

const {rooms} = require('../init/data.js');

const query = "INSERT INTO rooms (id, name, img, beds, people, size, view, price) VALUES ?";

const initDB = () => {
    connection.query("DELETE FROM rooms", function (err, results) {
        if (err) throw err;
        console.log(results);
    })

    connection.query(query, [rooms], function (err, results) {
        if (err) throw err;
        console.log(results);
    });
}
initDB();