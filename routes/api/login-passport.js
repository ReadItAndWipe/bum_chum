const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const Roll = require('../../models/Roll');
const Subscription = require('../../models/Subscription');

const register = function (req, res) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function (err) {
        if (err) {
            res.status(500);
            res.json({
                error: err
            });
        } else {
            // Log in the newly registered user
            loginUser(req, res);
        }
    });
};

const logout = function (req, res) {
    req.logout();
    console.log('logged out user');
    console.log('session object:', req.session);
    console.log('req.user:', req.user);
    res.sendStatus(200);
}

// helper functions
const authenticate = passport.authenticate('local');

function loginUser(req, res) {
    // passport.authenticate returns a function that we will call with req, res, and a callback function to execute on success    

    authenticate(req, res, function () {
        console.log('authenticated', req.user.username);
        console.log('session object:', req.session);
        console.log('req.user:', req.user);
        res.status(200);
        res.redirect('/api/order')
    });
}


router.get('/', (req, res) => {
    res.render('login', {title: "Login into your account"})
  });

router.post('/register', register);
router.post('/login', loginUser);
router.get('/logout', logout);

module.exports = router;