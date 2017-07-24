var nlp = require('compromise');

function partsOfSpeech(txt){
  return new Promise((resolve,reject)=>{
    try{
      let places = nlp(txt).places().data();
      let people = nlp(txt).people().data();
      let hashtags = nlp(txt).hashTags().data();
      let organizations = nlp(txt).organizations().data();
      let acronyms = nlp(txt).acronyms().data();
      let verbs = nlp(txt).verbs().data();
      let nouns = nlp(txt).nouns().data();
      let res = {};
      if(places.length>=1){
        res['places'] = places;
      }
      if(people.length>=1){
        res['people'] = people;
      }
      if(hashtags.length>=1){
        res['hashtags'] = hashtags;
      }
      if(organizations.length>=1){
        res['organizations'] = organizations;
      }
      if(acronyms.length >= 1){
        res['acronyms']=acronyms;
      }
      // if(verbs.length >= 1){
      //   res['verbs']=verbs;
      // }
      // if(nouns.length >= 1){
      //   res['nouns']=nouns;
      // }


      resolve(res);

    }catch(e){
      reject(e);
    }

  });
}

function swapsies(tweetText,params,pos){
  return new Promise((resolve,reject)=>{
    let output = tweetText;
    try{
      for(var i in pos){
        var posItem = pos[i][0].text.trim();

        var enteredItem = params[i];

        output = output.replace(
          posItem,'div(class="'+i+'") '+enteredItem);

      }
      resolve(output);
    }catch(e){
      reject(e);
    }
  });
}


module.exports.partsOfSpeech = partsOfSpeech;
module.exports.swapsies = swapsies;
