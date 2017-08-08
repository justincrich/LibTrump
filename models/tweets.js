//Parts of speach library
var Twitter = require('twitter-node-client').Twitter;
require('dotenv').config();
var config = {
    "consumerKey": process.env.TW_KEY,
    "consumerSecret": process.env.TW_SECRET,
    "accessToken": process.env.TW_TOKEN,
    "accessTokenSecret": process.env.TW_TOKENSECRET,
    "callBackUrl": process.env.TW_CALLBACKURL
};

//Setup twitter object
var twitter = new Twitter(config);
var partsOfSpeech = require('./nlp.js').partsOfSpeech;



var tweetProcessor = function (){
  let tweets = [];
  return {
    //load all requests
      load: (handle,num,max_id)=>{
          return new Promise((resolve,reject)=>{
            //object that stores all tweets to return
            let keeper = [];
            try{
              twitterRequest(handle,num,max_id).then(arr=>{
                for(let i = 0;i<arr.length; i++){
                  //process parts of speach (noun, person, etc)
                  partsOfSpeech(arr[i].text).then((resArr)=>{
                    let obj = resArr[0];
                    let totPOS = resArr[1];
                    console.log('total part',totPOS);
                    let length = Object.keys(obj).length;
                    arr[i].pos = obj;
                    //Store all the twitter provided entities

                    //for hashtags
                    if(arr[i].entities.hashtags.length >=1){

                      arr[i].pos['hashtag'] = arr[i].entities.hashtags;
                      totPOS['hashtags'] = arr[i].entities.hashtags.length;
                    }
                    //for user mentions
                    let userment = arr[i].entities.user_mentions;
                    if(userment.length >=1){

                      userment.forEach(mention=>{
                        if(arr[i].pos['handle']){
                          //if there's current a person array
                          arr[i].pos['handle'].push({
                            text:mention.screen_name
                          });
                        }else{
                          arr[i].pos['handle'] = [{
                            text:mention.screen_name
                          }];
                        }
                      });
                      totPOS['handles'] = arr[i].pos['handle'].length;

                    }
                    arr[i].totPOSCount = totPOS;
                    let keys = Object.keys(arr[i].pos);
                    console.log(keys);
                    //old code to keep tweets w/o pos from results ... removed because I need to query multiple results
                    if(keys.length>0){
                      keeper.push(arr[i]);
                    }
                    if(i===(arr.length-1)){

                      tweets = keeper;
                      console.log('resolve');
                      resolve(keeper);
                    }
                  });
                }
              }).catch(e=>{throw e});
            }catch (e){
              reject(e);
            }
      })
    },
    print:()=>{
      return tweets.slice();
    }

  };
}




function twitterRequest(handle,num,max_id){

  return new Promise((resolve,reject)=>{
    let options = { screen_name: handle, count: num};
    if(max_id){
      options['max_id'] = max_id;
    }
    twitter.getUserTimeline(
      options,
      (err,res,body)=>{
        reject(err);
      },(body)=>{
        resolve(JSON.parse(body));
        });
      });


}

module.exports.twitterRequest = twitterRequest;
module.exports.tweetProcessor = tweetProcessor;
