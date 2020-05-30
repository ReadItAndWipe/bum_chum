// middleware functions
const userAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).render('login', {title: "Login into your account"})
    }
}

module.exports = {
    userAuthenticated
};