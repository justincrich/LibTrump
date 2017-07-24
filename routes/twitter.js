var express = require('express');
var router = express.Router();
var tweetProcessor = require('../models/tweets.js').tweetProcessor;
var swapsies = require('../models/nlp.js').swapsies;
//enviornment variables
require('dotenv').config();
//Twitter config settings


//Tweet Data
var tweets = tweetProcessor();

router.get('/', function(req, res, next) {

  res.render('index',{page:'index'});
});

router.get('/tweet/:totTweets', function(req, res, next) {
  tweets.load('realDonaldTrump',req.params.totTweets).then((output)=>{
    res.send(output);
  });
});

router.get('/tweet/', function(req, res, next) {
  tweets.load('realDonaldTrump',10).then((output)=>{
    res.send(output);
  });
});
router.get('/fauxtweet/',(req,res,next)=>{
  res.redirect('/');
});
router.post('/fauxtweet/', function(req, res, next) {

  if(
    req.body.people === undefined ||
    req.body.places===undefined ||
    req.body.organizations === undefined ||
    req.body.acronyms === undefined
  ){
    res.send({
      error:"invalid input"
    });
    res.redirect('/');
  }else{
    console.log('load ', req.body);
    tweets.load('realDonaldTrump',1).then((output)=>{
      res.render('fauxtweet',{page:'fauxtweet',swapsies:{
        tweetText: output[0].text,
        params: req.body,
        pos: output[0].pos
      },data:output});
    });
  }
});



// router.get('/tweet/:id', function(req, res, next) {
//
// }






module.exports = router;
