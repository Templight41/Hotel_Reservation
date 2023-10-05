require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);

exports.loginPost = async (req, res, next) => {
    try {
        connection.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, async function (err, results, fields) {
            try {
                if(results[0].email == `${req.body.email}` && results[0].type == "login") {
                    if(true) {
                        const token = await jwt.sign({email: req.body.email}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                        //sending email
                        await (async function () {
                            try {
                              const data = await resend.emails.send({
                                from: 'Arsanya <noreply@arsanya.in>',
                                to: [`${req.body.email}`],
                                subject: 'Password reset',
                                html: `<p>Click <a href="https://hotel.arsanya.in/reset-password?reset='${token}">here</a> to reset your password</p>`,
                              });
                              console.log(data);
                            } catch (error) {
                              console.error(error);
                            }
                        })();
                        res.status(201).json({
                            status: "link sent to the given email",
                        })
                    }

                }
                else {
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