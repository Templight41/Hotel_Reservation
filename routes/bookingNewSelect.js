const mysql = require('mysql2');
const express = require('express');
require('dotenv').config();

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL);

exports.bookingNewSelect = (req, res, next) => {
    connection.query("SELECT * FROM rooms", function (err, res) {
    roomsData = res;
    next()
})
}