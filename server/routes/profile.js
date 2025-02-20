const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const Users = require('../model/User');

/**
 * 
 * All routes in regards to profile page.
 * 
 * These will be called by the front end.
 * 
 * @author Scott Mains
 * 
 */


router.post('/userdelete', (req,res)=>{
    const email = req.body.email;
    const userDelete= Users.find();
    userDelete.findOneAndRemove({"email": email}, function(err, obj) {
    if (err) throw err;
      console.log("1 user deleted");
    
     });
  });

  module.exports = router 