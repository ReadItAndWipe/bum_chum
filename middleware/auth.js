const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs')

module.exports = function (req, res, next) {
    //Get token from header 
    const token = req.header("x-auth-token");

    //See if a token exists 
    if(!token) {
        return res.status(401).render('login', {title: "Login into your account or sign up"})
    }

    //Verify 
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"))

        req.user = decoded.user; 
        next();
    } catch (error) {
        res.status(401).json({msg: "Token not found"})
    }
}