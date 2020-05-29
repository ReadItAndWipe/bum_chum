const express = require('express');
const router = express.Router();

//Import auth middleware
const auth = require("../../middleware/auth")

//Import Roll and Subsc schema
const Roll = require('../../models/Roll');
const Subscription = require('../../models/Subscription');
const Order = require('../../models/Order');

const {
  userAuthenticated
} = require('../../middleware/passport');

router.use(userAuthenticated);

// @route    GET api/myorders
// @desc     Show all orders for current user   
// @access   Private 
router.get('/', auth, async (req, res) => {
  //Retrieve all order from database for current user
  try {
    let orders = await Order.find({ user: req.user.id })
    if(!orders){
        return res.json({msg: "You have no current orders"})
    }
    res.json(orders)
  } catch (error) {
      console.error(error.msg)
      return res.status(500).json("server error")
    }
});

// @route    GET api/myorders/:orderId
// @desc     Show individual order for current user   
// @access   Private 
router.get('/', auth, async (req, res) => {
    //Retrieve selected order from database 
    try {
      let orders = await Order.find({ user: req.user.id })
      if(!orders){
          return res.json({msg: "You have no current orders"})
      }
      res.json(orders)
    } catch (error) {
        console.error(error.msg)
        return res.status(500).json("server error")
      }
  });
  
module.exports = router;