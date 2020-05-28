const express = require('express');
const router = express.Router();

//Import Roll and Subsc schema
const Roll = require('../../models/Roll');
const Subscription = require('../../models/Subscription');

// @route    GET api/
// @desc     Landing page shows all rolls  
// @access   Public 
router.get('/', async (req, res) => {
  //Retrieve all rolls from database 
  try {
    let subscriptions = await Subscription.find()
    let rolls = await Roll.find()
    res.render('home', { rolls, subscriptions } )
  } catch (error) {
    if(!rolls){
      return res.status(501).json("out of rolls")
    }
  }
});

module.exports = router;

//   if(req.query.category){
//     return Post.findByCategory(req.query.category)
// }else{
//     return Post.find();
// }
//   getAllPosts(req).
//   sort({
//       modified_date: -1
//   }).
//   exec((err, posts) => {
//       if (err) {
//           res.status(500);
//           return res.json({
//               error: err.message
//           });
//       }
//       res.render('posts', { posts } );
//   });
// }
//   getAllPosts(req).
//     sort({
//         modified_date: -1
//     }).
//     exec((err, posts) => {
//         if (err) {
//             res.status(500);
//             return res.json({
//                 error: err.message
//             });
//         }
//         res.render('posts', { posts } );
//     });
// };