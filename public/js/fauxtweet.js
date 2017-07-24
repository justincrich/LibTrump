let date = new Date(output[0].user.created_at);
console.log(date.toLocaleTimeString('en-US'));

swapsies(tweet.tweetText,tweet.params,tweet.pos).then((output)=>{
  $('.tweetTextContainer .text').append(output);
  let time = date.toLocaleTimeString('en-US');
  let date = date.date;
  $('.dateTime').append(date);

});
'7:47 AM - 10 Jul 2017'


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
