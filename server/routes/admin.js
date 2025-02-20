const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const Users = require('../model/User');

/**
 * 
 * All routes in regards to admin functionality.
 * 
 * These will be called in the front end.
 * 
 * @author Scott Mains
 * 
 */

  router.get('/getAllUsers', async (req,res) => {
    const userlist = await Users.find().sort({_id:-1})
    res.json(userlist);
  });

  router.post('/updateWins', async (req,res) => {
    const userid = req.body._id;
    const winUpdate = req.body.winUpdate

    Users.updateOne({"_id": userid},{$set: {"wins": winUpdate}},function(err, obj) {
      if (err) throw err;
        console.log("wins updated"); 
       });
  });

  router.post('/updateLosses', async (req,res) => {
    const userid = req.body._id;
    const lossUpdate = req.body.lossUpdate

    Users.updateOne({"_id": userid}, {$set: {"losses": lossUpdate}},function(err, obj) {
      if (err) throw err;
        console.log("wins updated");
       });
  });

module.exports = router;
