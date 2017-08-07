var nlp = require('compromise');

function partsOfSpeech(txt){
  return new Promise((resolve,reject)=>{
    try{

      let places = nlp(txt).places().data();
      let people = nlp(txt).people().data();
      // let hashtags = nlp(txt).hashTags().data();
      let organizations = nlp(txt).organizations().data();
      // let verbs = nlp(txt).verbs().data();
      // let nouns = nlp(txt).nouns().data();

      let res = {};
      let totPOS = {};

      if(places.length>=1){
        res['place'] = places;
        totPOS['places'] = places.length;
      }
      if(organizations.length>=1){
        res['organization'] = organizations;
        totPOS['organizations'] = organizations.length;
      }
      if(people.length>=1){
        res['person'] = people;
        totPOS['people'] = people.length;
      }



      //sum up POS parts to be used in determining the number of fields
      let sum = 0;
      for (i in totPOS){
        sum += totPOS[i];
      }
      totPOS['total'] = sum;


      resolve([res,totPOS]);

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
