
swapsies(tweet.tweetText,tweet.params,tweet.pos).then((output)=>{
  $('.tweetTextContainer .text').append(output);
  console.log('output: ',output);
  console.log('params: ',tweet.params);
  console.log('pos: ',tweet.pos);
});



function swapsies(tweetText,params,pos){
  return new Promise((resolve,reject)=>{
    let output = tweetText;
    try{
      for(var i in pos){
        var posItem = pos[i][0].text.trim();

        var enteredItem = params[i];

        output = output.replace(
          posItem,'<div class="pos tooltipped"'+
          'data-position="top" data-delay="50" data-tooltip="Original: '+posItem+'">'+
          enteredItem+'</div>');

      }
      resolve(output);
    }catch(e){
      reject(e);
    }
  });
}
