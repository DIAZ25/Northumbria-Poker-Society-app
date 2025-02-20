const router = require('express').Router();
const verify = require('../middleware/verifyToken');
const Newsfeed = require('../model/Newsfeed');


/**
 * 
 * All routes in regards to newsfeed page.
 * 
 * These will be called by the front end.
 * 
 * @author Scott Mains
 * 
 */

router.post('/postnewsfeed', async (req,res) => {

  const now = JSON.stringify(new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }))

  const newPost = new Newsfeed({
    
         userId:  req.body.userId,
         title: req.body.title,
         body: req.body.body,
         date: now
      }
  );
  console.log(req.body)
  newPost.save((error, post) => {
      if (error) {
          console.log(error);
        
      }

});
});

router.get('/getnewsfeed', async (req,res) => {
  const posts = await Newsfeed.find().sort({_id:-1})
  res.json(posts);
});

router.post('/newsfeeddelete', (req,res)=>{
  const postid = req.body._id;
  console.log(postid)
  const posts = Newsfeed.find();
  posts.deleteOne({"_id": postid}, function(err, obj) {
  if (err) throw err;
    console.log("1 document deleted");
  
   });

});


module.exports = router