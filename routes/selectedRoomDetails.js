// const mysql = require('mysql2');
const express = require('express');
require('dotenv').config();

// Create the connection to the database
// const connection = mysql.createConnection(process.env.DATABASE_URL);
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);

exports.selectedRoomDetails = (req, res, next) => {
    const { data, error } = supabase
        .from('rooms')
        .select()
        .eq('id', req.params.roomid)
        .then(data => {
            req.locals = data.data;
            next();
        })
    // connection.query(`SELECT * FROM rooms WHERE id = '${req.params.roomId}'`, function (err, res) {
    //     roomData = res;
    //     next()
    // })
}