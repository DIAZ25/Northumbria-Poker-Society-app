const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const newsfeedRoute = require('./routes/newsfeed');
const chatbotRoute = require('./routes/chatbot');
const adminRoute = require('./routes/admin');
const profileRoute = require('./routes/profile');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


dotenv.config();

// Database connection

  mongoose.connect(process.env.DB_CONNECT,  () => 
    console.log('connected to db')
    );

//Middleware

app.use(express.json());
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());

const proxy = require('http-proxy-middleware')

// Sets the routes for the front end to call.

app.use('/api/user', authRoute);
app.use('/api/newsfeed', newsfeedRoute);
app.use('/api/admin', adminRoute);
app.use('/api/chatbot', chatbotRoute);
app.use('/api/profile', profileRoute);

app.listen(
    process.env.PORT,
    console.log('Listening on port ', process.env.PORT)
  );