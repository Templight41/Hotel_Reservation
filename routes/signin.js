require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);


exports.loginPost = async (req, res) => {
    try {
        connection.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, async function (err, results, fields) {
        try {
            if(results[0].email == `${req.body.email}`) {
                // res.status(200).json({ status : "user exists" });
                if(await bcrypt.compare(req.body.password, results[0].password)) {
                    const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                    res.cookie("token", token, {
                    httpOnly: true,
                })
                res.status(201).json({
                status: "password match",
                token: token,
                })
            }
            else {
                res.status(200).json({ status : "Username and password does not match" });
            }

            }else {
            res.status(200).json({status: "User not found, create an Account"});
            }
        }
        catch {
            res.status(200).json({status: "User not found, create an Account"});
        }
        })
    }
    catch(err) {
        console.log(err)
    }
}