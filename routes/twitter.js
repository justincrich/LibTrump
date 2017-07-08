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
  twitter.getUserTimeline(
    { screen_name: 'realDonaldTrump', count: '10'},
     (err,res,body)=>{
       console.log('ERROR [%s]', err);
     }, (body)=>{
       tweets.load(JSON.parse(body))
             .then(res.send(tweets.print()));
       return next();


     });

});

module.exports = router;
