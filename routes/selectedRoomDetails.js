const mysql = require('mysql2');
const express = require('express');
require('dotenv').config();

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL);

exports.selectedRoomDetails = (req, res, next) => {
    connection.query(`SELECT * FROM rooms WHERE id = '${req.params.roomId}'`, function (err, res) {
        roomData = res;
        next()
    })
}