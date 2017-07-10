//Parts of speach library
var nlp = require('compromise');


var tweets = function (){
  let tweets = [];
  return {
      load: (arr)=>{
          return new Promise((resolve,reject)=>{
            try{
              arr.forEach((item,index,array)=>{
                //get all parts of speach for Tweet
                pos(item.text).then(obj=>{
                  item.pos = obj;
                  if(index === array.length-1){
                    //save results
                    tweets = array;
                    //return promise
                    resolve();
                  }
                }).catch(e=>{throw e});
              });
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

function cleanText(str){
  //remove hashtags
  str = str.replace(/\#\w\w+\s?/g, '');
  //remove links
  str = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
  return str;
}

function pos(obj){
  var a = new Promise((resolve,reject)=>{
    try{
      var res = {

        // nouns: nlp(obj).nouns().data(),
        // verbs: nlp(obj).verbs().data(),
        // adverbs: nlp(obj).adverbs().data(),
        // adjectives: nlp(obj).adjectives().data(),
        places: nlp(obj).places().data(),
        people: nlp(obj).people().data(),
        hashtags:nlp(obj).hashTags().data(),
        organizations:nlp(obj).organizations().data(),
        acronyms:nlp(obj).acronyms().data()


      };

      resolve(res);
    }catch(e){
      reject(e);
    }
  });
  return a;
}

module.exports = tweets;
