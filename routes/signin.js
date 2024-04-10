require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const mysql = require('mysql2');

// const connection = mysql.createPool(process.env.DATABASE_URL);
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);

exports.loginPost = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select()
            .eq("email", req.body.email)

        console.log(data)

        if(error != null || data.length == 0 || data[0].email != req.body.email)  return res.status(200).json({status: "User not found, create an Account"});

        if(!await bcrypt.compare(req.body.password, data[0].password)) return res.status(200).json({status: "Username and password does not match"});

        const token = jwt.sign({name: req.body.name, email: req.body.email, type: "login"}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
        })
        res.status(201).json({
            status: "password match",
            token: token,
        })
    }
    catch(err) {
        console.log(err)
        res.status(200).json({status: "Internal server error"});
    }
}