var axios = require("axios");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var jsonParser = require("body-parser").json;
var Twitter = require('twitter-node-client').Twitter;

//enviornment variables
var config = {
    "consumerKey": process.env.TW_KEY,
    "consumerSecret": process.env.TW_SECRET,
    "accessToken": process.env.TW_TOKEN,
    "accessTokenSecret": process.env.TW_TOKENSECRET,
    "callBackUrl": process.env.TW_CALLBACKURL
};
var twitter = new Twitter(config);
var error = function (err, response, body) {
    	console.log('ERROR [%s]', err);
	};
app.use(jsonParser());
	var success = function (data) {
    	var resp = JSON.parse(data);
      console.log(resp);

	};

var resp = twitter.getUserTimeline({ screen_name: 'realDonaldTrump', count: '10'}, error, success);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(logger("dev",{
  skip:(req,res)=>{
    return req.url == '/json'
  }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
