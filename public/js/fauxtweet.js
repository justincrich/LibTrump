
//   $( document ).ready(()=>{
//     html2canvas(document.getElementById('tweet'), {
//   onrendered: function(canvas) {
//     var data = canvas.toDataURL("image/png");
//     document.body.appendChild(data);
//   }
// });
//   });


//let date = new Date(output[0].user.created_at);
//console.log(date.toLocaleTimeString('en-US'));
//console.log(output);
// tweet.tweetText,tweet.params,tweet.pos
// let tweet = JSON.parse(output.tweet[0]);
// delete output['tweet'];
// swapsies(tweet,output,tweet.pos).then((output)=>{
//   $('.tweetTextContainer .text').append(output);
//   let time = date.toLocaleTimeString('en-US');
//   let date = date.date;
//   $('.dateTime').append(date);
//
// });
//
// function swapsies(tweet,params,pos){
//   return new Promise((resolve,reject)=>{
//     console.log(tweet);
//     let output = tweet.text;
//     try{
//       for(let i in pos){
//         //var posItem = pos[i][0].text.trim();
//         let posItems = pos[i];
//         let posKind = i;
//         posItems.forEach((item,index,arr)=>{
//             console.log(item);
//             if(item['article']){
//               //what happens if the item is a noun
//             }else{
//               //what happens if the item is anything else
//             }
//         });
//
//         // var enteredItem = params[i];
//         //
//         // output = output.replace(
//         //   posItem,'<div class="pos tooltipped"'+
//         //   'data-position="top" data-delay="50" data-tooltip="Original: '+posItem+'">'+
//         //   enteredItem+'</div>');
//
//       }
//       resolve(output);
//     }catch(e){
//       reject(e);
//     }
//   });
// }
