const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);

exports.resetTokenPost = (req, res) => {
    try {
      jwt.verify(req.params.token, process.env.JWT_SECRET_KEY, (err, email) => {
        if(err) {
          res.status(200).json({status: "Token is invalid or has expired"});
        }
        else {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            connection.query(`UPDATE users SET password = '${hash}' WHERE email = '${email.email}'`, function (err, results, fields) {
              if(err) {
                res.status(200).json({status: "Internal server error"});
              }
              else {
                res.status(201).json({status: "Password changed successfully!"});
              }
            })
          });
        }
    })
    }
    catch(err) {
      res.status(200).json({status: "Internal server error"});
    }
}