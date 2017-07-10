var express = require('express');
var router = express.Router();
var Twitter = require('twitter-node-client').Twitter;
var tweetHandler = require('../models/tweets');
//enviornment variables
require('dotenv').config();
//Twitter config settings
var config = {
    "consumerKey": process.env.TW_KEY,
    "consumerSecret": process.env.TW_SECRET,
    "accessToken": process.env.TW_TOKEN,
    "accessTokenSecret": process.env.TW_TOKENSECRET,
    "callBackUrl": process.env.TW_CALLBACKURL
};
//Setup twitter object
var twitter = new Twitter(config);

//Tweet Data
var tweets = tweetHandler();

router.get('/', function(req, res, next) {
  res.render('index',{page:'index'});
});

// router.get('/fauxtweet',(req,res,next)=>{
//   res.render('fauxtweet',{page:'fauxtweet'});
// });
router.post('/fauxtweet',(req,res,next)=>{
  console.log('PARAMS',req.body);
  res.render('fauxtweet',{page:'fauxtweet',inputs:req.body});

});

router.get('/onetweet', function(req, res, next) {
    twitter.getUserTimeline(
      { screen_name: 'realDonaldTrump', count: '1'},
      (err,res,body)=>{
        throw(err);
      },(body)=>{
        tweets.load(JSON.parse(body)).then(()=>{
          let dat = tweets.print();
          console.log(dat);
        });
      });

      next();
});

router.get('/tweet', function(req, res, next) {
  twitter.getUserTimeline(
    { screen_name: 'realDonaldTrump', count: '10'},
     (err,res,body)=>{
       console.log('!!ERROR [%s]', err);
     }, (body)=>{
       //console.log(JSON.parse(body));
       tweets.load(JSON.parse(body))
             .then(()=>{
               let dat = tweets.print();
               //iterate through each tweet and find the first one with items
               dat.forEach(a=>{
                 let pos = Object.entries(a.pos);
                 let count = 0;
                 pos.forEach(element=>{
                   let key = element[0];
                   let val = element[1];

                   if(val.length>0){
                     console.log("VALUES",val.length);
                     count++;

                   }
                 });
                 if(count>1){
                   res.send(tweets.print());
                   return
                 }
               });




             });
     });

     return next();
});

// router.get('/tweet/:id', function(req, res, next) {
//
// }





module.exports = router;
