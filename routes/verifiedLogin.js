const jwt = require('jsonwebtoken')

exports.verifiedLogin = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, (err, email) => {
    if(!err) return res.redirect("/profile")
    // console.log(err)
    req.locals = err
    next()
  })
}