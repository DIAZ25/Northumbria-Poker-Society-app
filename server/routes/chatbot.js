const Users = require('../model/User');
const router = require('express').Router();

/**
 * 
 * Finds the user with the highest
 * amount of wins
 * 
 * @author Scott Mains
 * 
 */

  router.get('/findWinner', async (req,res) => {
    const userlist = await Users.find().sort({wins:-1}).limit(1)
    res.json(userlist);
  });

  module.exports = router;