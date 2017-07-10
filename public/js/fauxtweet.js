console.log('fauxtweet');
// var func = ()=>{
//   let tweetData = [];
//   return {
//     set:(tweets)=>{
//       tweetData = tweets;
//     },
//     req:()=>{
//       return new Promise((resolve,reject)=>{
//         try{
//           //get tweets
//           fetch('/tweet').then(resp=>{
//             resp.json().then(tweets=>{
//               tweetData=tweets;
//               resolve(tweets);
//             });
//           });
//         }catch(e){
//           reject(e);
//         }
//       });
//     },
//     getAll:()=>{
//         return tweetData;
//     }
//   };
// }
//
// var data = func();
//
// //Begin work after page load
// window.onload = ()=>{
//   data.req().then(dat=>{
//
//
//     dat.forEach(element=>{
//       let val = Object.entries(element.pos);
//       console.log(val);
//
//     });
//   });
// }
