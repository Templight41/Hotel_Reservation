require('dotenv').config()
const jwt = require('jsonwebtoken')
// const mysql = require('mysql2');
const {Resend} = require('resend')

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
// const connection = mysql.createConnection(process.env.DATABASE_URL);
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);


exports.resetPasswordPost = async (req, res, next) => {
    try {
        const { data, email } = supabase
            .from('users')
            .select()
            .eq('email', req.body.email)
            .then(data => {
                console.log(data)
            })
        
        if(error != null || data.length == 0 || data.data[0].email != req.body.email)  return res.status(200).json({status: "User not found, create an Account"});
        
        const token = jwt.sign({email: req.body.email, type: req.body.type}, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

        //sending email
        async function resendMail() {
            try {
                const data = await resend.emails.send({
                from: 'Arsanya <noreply@arsanya.in>',
                to: [`${req.body.email}`],
                subject: 'Password reset',
                html: `<p>Click <a href="https://hotel.arsanya.in/reset-password/${token}">here</a> to reset your password or click on the link given below</p><br><br>https://hotel.arsanya.in/reset-password/${token}`,
                });
                await res.status(201).json({
                    status: "link sent to the given email!",
                })
            } catch (error) {
                res.status(200).json({status: "Internal server error"});
            }
        }
        resendMail();
    }
    catch(err) {
        res.status(500).json({status: "Internal server error"})
        console.log(err)
    }



    // try {
    //     connection.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, async function (err, results, fields) {
    //         try {
    //             if(results[0].email == req.body.email) {
    //                 const token =  jwt.sign({email: req.body.email, type: req.body.type}, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
                    
    //                 //sending email
    //                 async function resendMail() {
    //                     try {
    //                         const data = await resend.emails.send({
    //                         from: 'Arsanya <noreply@arsanya.in>',
    //                         to: [`${req.body.email}`],
    //                         subject: 'Password reset',
    //                         html: `<p>Click <a href="https://hotel.arsanya.in/reset-password/${token}">here</a> to reset your password or click on the link given below</p><br><br>https://hotel.arsanya.in/reset-password/${token}`,
    //                         });
    //                         await res.status(201).json({
    //                             status: "link sent to the given email!",
    //                         })
    //                     } catch (error) {
    //                         res.status(200).json({status: "Internal server error"});
    //                     }
    //                 }
    //                 resendMail();

    //             }
    //             else {
    //               res.status(200).json({status: "User not found, create an Account"});
    //             }
    //         }
    //         catch {
    //             console.log(err)
    //             res.status(200).json({status: "Account not found with the given address"});
    //         }
    //     })
    // }
    // catch(err) {
    //     console.log(err)
    // }
}