const mongoose = require('mongoose');

/**
 * 
 * Userschema.
 * 
 * Specifies the data that should
 * be entered into the mongodb
 * for Users
 * 
 * @author Scott Mains
 * 
 */

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    studentid: {
        type: String,
        required: true,
        max: 15,
        min: 5
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);