const url = "http://localhost:3000/tweet/";
let tweetStore = [];
let selectedTweet = null;
let loading = true;
const tweetCard=
'<div class=\'tweetContainer\'>'+
		'<div class=\'tweetBody\'>'+
				'<div class=\'profileOverview\'>'+
						'<img class=\'img\' src=\'../media/profileImg.jpg\'/>'+
						'<a >'+
								'<div class=\'accountInfo\'>'+
										'<div class=\'nameContainer\'>'+
												'<strong class=\'name\'>Donald J. Trump</strong>'+
												'<span class=\'badges\'/>'+
										'</div>'+
										'<span class=\'handle\'>@realDonaldTrump</span>'+
								'</div>'+
						'</a>'+
				'</div>'+
				'<div class=\'tweetTextContainer\'>'+
						'<p class=\'text\'>'+
						'</p>'+
				'</div>'+
				'<div class=\'details\'>'+
						'<div class=\'dateTime\'>'+
						'</div>'+
				'</div>'+
		'</div>'+
'</div>';
//load the tweets into the store
//start loading processer
fetch(url)
  .then(res=> {
    return res.json();
  })
  .then(json=>{
    loading = false;
    tweetStore = json;
    console.log(tweetStore);
  });

  $( document ).ready(function() {
      //select the most current tweet to process by default
      selectedTweet = tweetStore.shift();

      //handle click on latest link tab
      $('.latestLink').on('click',()=>{
        if(selectedTweet === undefined){
          selectedTweet = tweetStore.shift();
        }
      }

      //handle pick a tweet activity
      $('.pickATweet').on('click',()=>{
        tweetStore.unshift(selectedTweet);
        selectedTweet = undefined;
        console.log("click pick",tweetStore);

        //what happens if there are no tweets received
        if(tweetStore.length<0 && loading === false){
          $('#pickTweetTab').append(
            "<h5 class='tweetNotFoundNotice'>'No Tweets Found, Come Back Later'</h5>");

          //Otherwise show tweets
        }else{

          tweetStore.forEach((tweet,index,arr)=>{
            let $div = $(tweetCard);
						$($div).attr('id','tweet'+(index+1));
						$($div).find('.tweetTextContainer .text').append(tweet.text);
            $div.click((e)=>{
              console.log('click tweet');
            });
            $('#pickTweetTab').append(
              $div);
          });
        }
      });
  });

  /*
    Unused Code
    else if(loading === true){
      //NEED TO FIX
      $('#pickTweetTab').append(
        "<h5 class='tweetNotFoundNotice'>'Tweets Loading'</h5>");

        // $('#pickTweetTab').append(
        //   "<h5 class='tweetNotFoundNotice'>Latest Tweets</h5>");
    }
  */
