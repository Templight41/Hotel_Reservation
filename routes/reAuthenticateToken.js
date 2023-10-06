const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token
    if(token == null) return res.redirect("/login")

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, email) => {
        if(err) return res.redirect("/login")
        req.email = email
        next()
    })
}