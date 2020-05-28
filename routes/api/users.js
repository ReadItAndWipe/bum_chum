const express = require('express');
const router = express.Router();

//Import express validator 
const { check, validationResult } = require('express-validator');

//Import User Scheme 
const User = require('../../models/User');

// @route    GET api/users
// @desc     Register user 
// @access   Public 
router.post(
  '/', 
  // Validate input using express-validator 
  [check('name', 'Name required')
    .not()
      .isEmpty(),
  check('email', 'Email required')
    .isEmail(),
  check('password', 'Password must be at least 6 characters')
    .isLength({ min: 6 })
  ], 
  (req, res) => {
    //Check validations for errors 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      
      // Check if user exists 
    
      // Encrypt password 
  
      // Return jsonwebtoken 


      } catch (error) {
    
  }
  res.send("User added")
});

module.exports = router; 