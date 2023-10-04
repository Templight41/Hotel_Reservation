const jwt = require('jsonwebtoken')

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, email) => {
        if(err) return res.sendStatus(403)
        req.email = email
        next()
    })
}