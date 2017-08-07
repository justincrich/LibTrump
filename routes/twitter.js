var express = require('express');
var router = express.Router();
var tweetProcessor = require('../models/tweets.js').tweetProcessor;
var swapsies = require('../models/swapper.js').swapsies;
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
  //Check that
  let holder = {};
  let tweet = {};
  for(i in req.body){
    let element = req.body[i];
    //remove id number from obj key
    let kind = i.replace(/[0-9]/g, '');
    if(holder[kind] && kind != 'tweet'){
      //add element to object if it's kind is in there
      holder[kind].push(element);
    }else if (kind === 'tweet'){
      //if kind is tweet process the tweet
      tweet = JSON.parse(element);
    }else{
      //create new array of objects with element
      holder[kind]=[element];
    }
  }
  console.log(tweet);
  swapsies(tweet,holder).then(output=>{
    console.log(output);
    //let html = '<p class="text">'+output.text+'</p>'
    res.render('fauxtweet',{page:'fauxtweet',data:output,txtHTML:output.text});
  });

});



// router.get('/tweet/:id', function(req, res, next) {
//
// }






module.exports = router;
