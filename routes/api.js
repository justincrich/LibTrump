var express = require('express');
var twitter = require('./twitter');
var router = express.Router();

router.use('/tweets',twitter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    message:'Ok'
  });
});

module.exports = router;
