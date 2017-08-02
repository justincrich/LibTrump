const url = "http://localhost:3000/tweet/10";
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
    selectedTweet = tweetStore.shift();
		$('#libATweetTab').append('<h5>Lib The Latest Tweet</h5>');
    loadInput(selectedTweet.pos);
  });

  $( document ).ready(function() {
    $('ul.tabs').tabs();
      //select the most current tweet to process by default

      console.log('on load',tweetStore);

      //handle click on latest link tab
      $('.latestLink').on('click',()=>{
        //clear out the pick tweet tab each time you nav from the tab
        $('#libATweetTab').empty();
        //if there's no tweet on hold get one
        if(selectedTweet === undefined){
          $('#libATweetTab').empty();
          selectedTweet = tweetStore.shift();

          loadInput(selectedTweet.pos);
        }

      });

      //handle pick a tweet activity
      $('.pickATweet').on('click',()=>{
        if(selectedTweet){
          //place tweet being held back in store
          tweetStore.unshift(selectedTweet);
          selectedTweet = undefined;
        }
        //selectedTweet = undefined;


        if(tweetStore.length<0 && loading === false){
          //what happens if there are no tweets received
          $('#libATweetTab').append(
            "<h5 class='tweetNotFoundNotice'>'Error, No Tweets Found, Come Back Later'</h5>");
        }else{
          //Otherwise show tweets
          tweetStore.forEach((tweet,index,arr)=>{
            let card = createTweetCard(tweet.text,index);
            card.click((e)=>{
              let id = $(e.target).closest(".tweetContainer").attr('id');
              selectedTweet = tweetStore.splice(id,1)[0];
              loadInput(selectedTweet.pos);
              //$('ul.tabs').css('background','tomato');
              $('.indicator').remove();
              $('#tab1').after('<li class="indicator" style="right: 0px; left: 112px;"></li>')
            });
            $('#pickTweetTab').append(
              card);
          });
        }
      });
  });

  function createTweetCard (tweetTxt, index = 0){
    let $div = $(tweetCard);
    $($div).attr('id',index);
    $($div).find('.tweetTextContainer .text').append(tweetTxt);
    return $div;
  }

  //function that determines how may inputs we can take on the tweet,
  //input text will replace tweet text
  function loadInput (pos){
    //get array of keys of parts of speach
    let keys = Object.keys(pos);
    if(keys.length>0){
      //show input fields based on POS
      //look at each key and create a key for each
      keys.forEach(key=>{
        let part = pos[key];
        part.forEach((obj, index, arr) => {
          //capatalize first letter
          let fieldName = key.charAt(0).toUpperCase()+key.slice(1);
          let $input =
          '<div class=\'input-field '+key+'\'>'+
          		'<input type=\'text\' name='+key+''+index+' required class=\'qField '+key+' validate\'>'+
          				'<label class=\'qLabel\' for=\''+key+''+index+'\'>'+
          						fieldName+
          				'</label>'+
          		'</input>'+
          '</div>';
          $input = $($input);
          $('#libATweetTab').append($input);
        });
      });
      let btn =
      '<div class="buttonBox">'+
      '<button class="btn waves-effect waves-light submitButton" type="submit" name="action" value="Submit">'+
      'Submit'+
      '</button>'+
      '</div>';

      $('#libATweetTab').append(btn);


    }else{
      //if no POS in tweet move on to the next tweet recursively
    }
  }



  /*
    Unused Code
    else if(loading === true){
      //NEED TO FIX
      $('#libATweetTab').append(
        "<h5 class='tweetNotFoundNotice'>'Tweets Loading'</h5>");

        // $('#libATweetTab').append(
        //   "<h5 class='tweetNotFoundNotice'>Latest Tweets</h5>");
    }
  */
