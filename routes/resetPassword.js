require('dotenv').config()
const jwt = require('jsonwebtoken')
const mysql = require('mysql2');
const Resend = require('resend')

const connection = mysql.createConnection(process.env.DATABASE_URL);

exports.resetPasswordPost = async (req, res, next) => {
    try {
        connection.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, async function (err, results, fields) {
            try {
                console.log(req.body.email)
                console.log(results[0].email)
                if(results[0].email == `${req.body.email}` && req.body.type == "reset") {
                    if(true) {
                        const token = await jwt.sign({email: req.body.email, type: req.body.type}, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
                        //sending email
                        await async function resendMail() {
                            try {
                              const data = await Resend.emails.send({
                                from: 'Arsanya <noreply@arsanya.in>',
                                to: [`${req.body.email}`],
                                subject: 'Password reset',
                                html: `<p>Click <a href="https://hotel.arsanya.in/reset-password?reset='${token}">here</a> to reset your password</p>`,
                              });
                              console.log(data);
                            } catch (error) {
                              console.error(error);
                            }
                        }
                        resendMail();
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
                console.log("first error")
                res.status(200).json({status: "User not found, create an Account"});
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}