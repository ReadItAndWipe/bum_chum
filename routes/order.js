const express = require('express');
const router = express.Router();

//Import express validator 
const { check, validationResult } = require('express-validator');

//Import User Scheme 
const Subscription= require('../models/Subscription');
const Roll = require('../models/Roll');
const Order = require('../models/Order');

// @route    GET api/order
// @desc     Generate order form 
// @access   Public 
router.get('/', async (req, res) => {
  let subscriptions = await Subscription.find()
  let rolls = await Roll.find()
  res.render('order_form', {title: "Order a order", subscriptions, rolls})
});

const {
  userAuthenticated
} = require('../middleware/passport');

router.use(userAuthenticated);
// @route    POST api/order
// @desc     Create order for current user  
// @access   Private 
router.post('/', 
  // Validate input using express-validator 
  [check('name', 'Name required')
    .not()
      .isEmpty(),
  check('address', 'Address required')
    .not()
      .isEmpty(),
  check('rolls', 'Category required')
    .not()
      .isEmpty(),
  check('subscription', 'Category required')
    .not()
      .isEmpty(),
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
      address, 
      rolls,
      subscription
    } = req.body; 

    try {
      //check if order exists (time permitting)

      const order = new Order({
        name,
        address,
        rolls,
        subscription,
        user: req.user.id
      });

      await order.save()

      } catch (error) {
        console.error(error.message)
        res.status(500).json("server error")
      }
  res.render('order_success')
});

module.exports = router; 