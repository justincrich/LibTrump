var chai = require('chai');
let should = chai.should();
var expect = require('chai').expect;
var assert = require('assert');
let tweetProcessor= require('../models/tweets.js').tweetProcessor;
let twitterRequest = require('../models/tweets.js').twitterRequest;
//test suite
describe('Tweet Processing', function(){
  let tweets;
  let handle;
  let test;
  beforeEach(()=>{
    tweets = tweetProcessor();
    handle = 'realDonaldTrump';
    test = {
      promise:new Promise((resolve,reject)=>{
        if(handle === 'realDonaldTrump'){
          resolve();
        }else{
          reject();
        }
      })
    };
  });


  //Test spec (unit test)
  describe('Request Tweets', function(){
    it('Load 1', function(){
      var promise = tweets.load(handle,1);
      return promise.then(output=>{
        if(output.length>0){
          this._runnable.title = this._runnable.title+`: result count is ${output.length}`;
        }else{
          this.test.parent.title = this._runnable.title+': ERROR insufficient results';
        }
        expect(output.length).is.equal(1);
      });
    });
    it('Load Multiple', function(){
      var promise = tweets.load(handle,10);

      return promise.then(output=>{

        if(output.length>0){
          this._runnable.title = this._runnable.title+`: result count is ${output.length}`;
        }else{
          this.test.parent.title = this._runnable.title+': ERROR insufficient results';
        }
        expect(output.length).is.above(0);
      });
    });
  });

  describe('Return Tweet Data',function(){
    it('Data Returned', function(){
      var promise = tweets.load(handle,1);
      return promise.then(output=>{
        console.log('OUTTTTTT',output.length)
        var arrLength = output.length;
        if(arrLength>0){
          this._runnable.title = this._runnable.title+`: result output is ${arrLength}`;
        }else{
          this.test.parent.title = this._runnable.title+': ERROR insufficient results';
        }
        expect(arrLength).is.eql(1);
      });
    });
  });
  xdescribe('Process Tweets',function(){
    xit('Return alternate text',function(){
      var promise = tweets.load(handle,1);
      return promise.then(output=>{
        var output = tweets.print();
      })
    });
  });
  describe('Request Single Tweet',function(){
    xit('Input: Tweet ID', function(){});
    xit('Error: No ID', function(){});
    xit('Output: Tweet Object', function(){});
    xit('Error: No Such Tweet', function(){});
    xit('Handle no NLP result errors', function(){});
  });



});
