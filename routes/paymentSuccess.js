const jwt = require('jsonwebtoken')
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);

exports.paymentSuccess = (req, res) => {
    
    console.log(req.query)
    console.log(req.body)
    jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, (err, response) => {
        if(err) return req.locals = err
        console.log(response)

        const p = [[req.body.razorpay_payment_id, req.body.razorpay_order_id, req.body.razorpay_signature, response.email, req.query.roomId, req.query.bookedOn, req.query.checkIn, req.query.checkOut, req.query.nights, req.query.amount]]

        connection.query(`INSERT INTO bookings (paymentId, orderId, signature, email, roomId, bookedOn, checkIn, checkOut, nights, amount) VALUES ?`, [p], function (err, results, fields) {
            console.log(results)
            console.log(err)
            res.redirect("/profile")
        })
    })
}