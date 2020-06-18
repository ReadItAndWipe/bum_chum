const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('config')

//Import express validator 
const { check, validationResult } = require('express-validator');

//Import User Scheme 
const User = require('../models/User');

// @route    GET api/users
// @desc     Register user 
// @access   Public 
router.get('/', (req, res) => {
  res.render('form', {title: "Register as a user"})
});

// @route    POST api/users
// @desc     Register user 
// @access   Public 
router.post('/', 
  // Validate input using express-validator 
  [check('name', 'Name required')
    .not()
      .isEmpty(),
  check('email', 'Email required')
    .isEmail(),
  check('password', 'Password must be at least 6 characters')
    .isLength({ min: 6 })
  ],  
  async (req, res) => {
    // Check validations for errors 
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    //Render signup form 
    // res.render('signup', { title: 'Registration form'});
    //Request data destructured 
    const {
      name, 
      email, 
      password
    } = req.body; 

    try {
      // Check if user exists 
      let user = await User.findOne({ email });
      if(user){
        return res.status(400).json({ error: "User already exists "})
      }

      user = new User(req.body);

      // Encrypt password 
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save()

      // Return jsonwebtoken 
      const payload = {
          user: {
              id: user.id
          }
      }

      //Secret lives in default.json 
      jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
              if(err) throw err;
                res.json({token});
          } 
      )

      } catch (error) {
        console.error(error.message)
        res.status(500).json("server error")
      }
//   res.send("user signed up")
});

module.exports = router; 