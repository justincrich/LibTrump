const nlp = require('compromise');
function swapsies(tweet,params){
  return new Promise((resolve,reject)=>{
    let output = tweet.text;
    let wordIndex = [];
    try{
      for ( key in params){
        console.log('KEY',key);
        let allTypes = params[key];
        let family = tweet.pos[key];

        allTypes.forEach((val, index, arr)=>{
          //set handles to the same case
          if(key === "handle"){
            output = output.replace(new RegExp(family[index].text.trim(),'i'),family[index].text.trim());
          }

          //remove entered characters in hashtags and handles
          let first = val.charAt(0);
          if(first === '@' || first === '#'){
            val = val.slice(1);
          }
          wordIndex.push({
            original:family[index].text,
            new: val,
            index: output.indexOf(family[index].text),
            type:key
          });

          //word to replace
          let replace = family[index].text.trim();
          var puncEnd = !!replace.match(/[.,:!?]$/);//checks if the word to be replaced has a puncuation at the end
          if(puncEnd){
            replace = replace.slice(0,-1);
          }
          //index of word
          let ind = output.indexOf(family[index].text.trim());
          let wordLength = replace.length;
          //change start index and word length if it has a hashtag or handle
          if(key==='hashtag' || key==='handle'){
            ind--;
            wordLength++;
          }
          let beg = output.slice(0,ind);
          let end = output.slice(ind);
          console.log(beg);
          console.log(end);

          let specialChar = '';
          if(key==='hashtag'){
            specialChar = '#';
          }else if(key==='handle'){
            specialChar = '@';
          }
          output = beg + '<div class="pos tooltipped"'+
          'data-position="top" data-delay="50" data-tooltip="Original: '+specialChar+family[index].text.trim()+'">'+
          specialChar+val+'</div>';
          output += end.slice(wordLength);

          // output = output.replace(
          //   new RegExp(family[index].text.trim(),'i'),'<div class="pos tooltipped"'+
          //   'data-position="top" data-delay="50" data-tooltip="Original: '+family[index].text+'">'+
          //   val+'</div>');
        });
      }

      resolve({
        text:output,
        indices:wordIndex
      });


    }catch(e){
      reject(e);
    }
  });
}

module.exports.swapsies = swapsies;
