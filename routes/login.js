const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');


//Import express validator 
const { check, validationResult } = require('express-validator');

//Import User schema
const User = require('../models/User');

// @route    GET api/login
// @desc     Login form for user 
// @access   Public 
router.get('/', (req, res) => {
    res.render('login', {title: "Login into your account"})
  });

//@route    POST api/login
//@desc     Authenticate user & get token 
//@access   Public 
router.post(
    '/', 
   [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is required').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
      }
  
      //Destructure for request data 
      const {
        email, 
        password 
      } = req.body;
  
      try {
        // See if user exists 
        let user = await User.findOne({ email });
        
        if (!user){
          return res
            .status(400)
            .json({errors: [{ msg: 'Invalid credentials' }] });
        }
  
        //Check password entered matches users password 
        const isMatch = await bcrypt.compare(password, user.password);
  
        if(!isMatch){
          return res
          .status(400)
          .json({errors: [{ msg: 'Invalid credentials' }] });
        }
  
        //Return jsn web token 
        const payload = {
          user: {
            id: user.id
          }
        }
        
        //secret lives in default.json 
        jwt.sign(
          payload, 
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if(err) throw err;
            res.json( {token} );
          }
        );
        
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
  });
  
module.exports = router; 