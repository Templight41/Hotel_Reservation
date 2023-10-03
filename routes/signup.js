require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2');


const connection = mysql.createConnection(process.env.DATABASE_URL);

exports.createAccountPost = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        connection.query(`INSERT INTO users (name, email, password) VALUES ("${req.body.name}", "${req.body.email}", "${hashedPassword}")`, function (err, results, fields) {
        console.log(results) // results contains rows returned by server
        console.log(fields) // fields contains extra metadata about results, if available
        console.log(err)
        if(err != null) {
            res.status(200).json({status: "Account already exists"})
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
}