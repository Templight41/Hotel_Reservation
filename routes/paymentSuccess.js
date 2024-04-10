const jwt = require('jsonwebtoken')
// const mysql = require('mysql2');

// const connection = mysql.createConnection(process.env.DATABASE_URL);
const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_DB_URL, process.env.SUPABASE_KEY);


exports.paymentSuccess = (req, res) => {
    
    console.log(req.query)
    console.log(req.body)
    jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, async (err, response) => {
        if(err) return req.locals = err

        req.query.amount = req.query.amount.toString().slice(0,-2) + "." + req.query.amount.toString().slice(-2,3);
        console.log(req.query.amount)

        const p = [{ paymentid: req.body.razorpay_payment_id, orderid: req.body.razorpay_order_id, signature: req.body.razorpay_signature, email: response.email, roomid: req.query.roomId, bookedon: req.query.bookedOn, checkin: req.query.checkIn, checkout: req.query.checkOut, nights: req.query.nights, amount: parseFloat(req.query.amount)}]

        await supabase
            .from('bookings')
            .insert(p)
            .then((result) => {
                console.log(result)
                console.log("Inserted")
                res.redirect("/profile")
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({status: "Internal server error"});
            })

    })
}