const jwt = require("jsonwebtoken");

exports.resetTokenGet = (req, res) => {
    try {
      jwt.verify(req.params.token, process.env.JWT_SECRET_KEY, (err, email) => {
        console.log(email)
        if(err) {
          res.render("reset-password", {emailSent: true, tokenStatus: false, errorMessage: "Token is invalid or has expired"})
        }
        else {
          res.render("reset-password", {emailSent: true, tokenStatus: true, errorMessage: ""})
        }
    })
    }
    catch(err) {
      res.render("reset-password", {emailSent: false, tokenStatus: false, errorMessage: "Internal server error"})
    }
  }