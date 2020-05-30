const express = require("express")

const router = express.Router()

// @route    GET api/about
// @desc     diplay company information 
// @access   Public 
router.get('/', (req, res) => {
    res.render('about', {title: "About Us"})
  });

module.exports = router