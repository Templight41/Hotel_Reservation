require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const mysql = require('mysql2');
const {Resend} = require('resend');

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);
// const connection = mysql.createConnection(process.env.DATABASE_URL);
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);

exports.createAccountPost = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const { data, error } = await supabase
            .from('users')
            .insert({name: req.body.name, email: req.body.email, password: hashedPassword})

        console.log(error)

        if(error != null) return res.status(200).json({status: "Account already exists"})
        
        const token = jwt.sign({name:req.body.name, email: req.body.email, type: req.body.type}, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
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
  catch(err) {
    res.status(500).json({status: "error"})
      console.log(err)
  }
}