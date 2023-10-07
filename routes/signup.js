require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mysql = require('mysql2');
const {Resend} = require('resend');

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
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
                const token = jwt.sign({email: req.body.email, type: req.body.type}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                    res.cookie("token", token, {
                    httpOnly: true,
                })
                res.status(201).json({
                    status: "success",
                    token: token,
                })
                async function resendEmail() {
                    try {
                      const data = await resend.emails.send({
                        from: 'Arsanya <noreply@arsanya.in>',
                        to: [`${req.body.email}`],
                        subject: 'Welcome to Sofitel',
                        html: `<strong>${req.body.name}, </strong><p>Welcome to Sofitel. Your account has been created</p><br><p>Click <a href='https://hotel.arsanya.in/profile'>here</a> To visit your profile.</p>`,
                      });
                      console.log(data);
                    } catch (error) {
                      console.error(error);
                    }
                  }
                  resendEmail();
            }
            })
    }
    catch(err) {
        console.log(err)
    }
    }