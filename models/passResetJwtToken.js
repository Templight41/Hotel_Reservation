const jwt = require('jsonwebtoken')

exports.authenticateResetToken = (req, res, next) => {
    const token = jwt.sign({email: req.body.email, type: req.body.type}, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
    res.cookie("token", token, {
      httpOnly: true,
    })
    res.status(201).json({
    status: "Reset link sent to email",
    token: token,
    })
    console.log(token)
    console.log(req.body.type)
}