const { application } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * 
 * Verify token function which is wrapped
 * on routes that require jwt 
 * authentication.
 * 
 * @author Scott Mains
 * 
 */

module.exports = function verify (req,res,next){
  
      const authHeader = req.headers.authorization
      if (authHeader) {
        const accessToken = authHeader.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
       return res.sendStatus(403).json("Token isn't valid"); 
      }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("You are not authenticated");
    }
  };

 

