const mongoose = require('mongoose');

/**
 * 
 * Newsfeed schema.
 * 
 * Specifies the data that should
 * be entered into the mongodb
 * for newsfeed.
 * 
 * @author Scott Mains
 * 
 */

const newsfeedSchema =  new mongoose.Schema({

    userId:Number,
    id: Number,
    title: String,
    body: String,
    date: String
    
  });
       

module.exports = mongoose.model('Newsfeed', newsfeedSchema);

