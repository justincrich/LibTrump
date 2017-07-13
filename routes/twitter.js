var express = require('express');
var router = express.Router();
var tweetProcessor = require('../models/tweets.js').tweetProcessor;
//enviornment variables
require('dotenv').config();
//Twitter config settings
//Tweet Data
var tweets = tweetProcessor();

router.get('/', function(req, res, next) {
  res.render('index',{page:'index'});
});

router.get('/tweet/:totTweets', function(req, res, next) {
  tweets.load('realDonaldTrump',req.params.totTweets).then((resultLength)=>{
    res.send(tweets.print());
  });
});

router.get('/tweet/', function(req, res, next) {
  tweets.load('realDonaldTrump',10).then(()=>{
    res.send(tweets.print());
  });
});



// router.get('/tweet/:id', function(req, res, next) {
//
// }





module.exports = router;
