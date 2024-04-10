const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const mysql = require('mysql2');

// const connection = mysql.createConnection(process.env.DATABASE_URL);
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);


exports.resetTokenPost = (req, res) => {
    try {
      jwt.verify(req.params.token, process.env.JWT_SECRET_KEY, (err, email) => {
        if(err) return res.status(200).json({status: "Token is invalid or has expired"});

        bcrypt.hash(req.body.password, 10, function(err, hash) {
          const { data, error } = supabase
            .from('users')
            .update({ password: hash })
            .eq('email', email.email)
            .then(() => {
              return res.status(201).json({status: "Password changed successfully!"});

          })
            
          if(error != null) return res.status(200).json({status: "Internal server error"});
              
        });
      })
    }
    catch(err) {
      res.status(200).json({status: "Internal server error"});
    }
}