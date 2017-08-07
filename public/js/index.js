const url = document.URL;
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
$('#formIndicator').show();
fetch("/tweet/5")
  .then(res=> {
    return res.json();
  })
  .then(json=>{
    loading = false;
    tweetStore = json;
    console.log('tweets',tweetStore);
    selectedTweet = tweetStore.shift();
		$('#formIndicator').hide();
    loadInput(selectedTweet.pos, selectedTweet.totPOSCount);
  });

  $( document ).ready(function() {
			$('.modal').modal();
      console.log('on load',tweetStore);

			//handle pick a tweet activity
			$('#formMoreTweetsBtn').on('click',()=>{
				if(selectedTweet){
					//place tweet being held back in store
					tweetStore.unshift(selectedTweet);
					selectedTweet = undefined;
				}

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
							$('#libATweetTab').contents(':not(.buttonBox)').remove();
							loadInput(selectedTweet.pos,selectedTweet.totPOSCount);
						});
						$('#moreTweetsModalIndex .modal-content .modal-tweets').append(
							card);
					});
				}
			});


			//handles case where no tweet is selected but close is clicked
      $('#moreTweetsModalIndexClose').on('click',(e)=>{
        // //clear out the pick tweet tab each time you nav from the tab
        // $('#libATweetTab').empty();
        // //if there's no tweet on hold get one
        // if(selectedTweet === undefined){
        //   $('#libATweetTab').empty();
        //   selectedTweet = tweetStore.shift();
        //   loadInput(selectedTweet.pos);
        // }

      });


			//handle form submit
			$('#sumbitIndexForm').on('click',(e)=>{
				e.preventDefault();
				//check to see if each field is filled in the form
				let isValid = true;
				$('input.qField').each((index)=>{

						let arr = document.getElementsByClassName('qField');

					if(arr[index].value===''){
						isValid = false;
					};
				});
				if(isValid){
					$('<input />').attr('type','hidden')
						.attr('name','tweet')
						.attr('value',JSON.stringify(selectedTweet))
						.appendTo('#libATweetTab');
					console.log('tap');
					document.questionForm.submit();
				}else{
					Materialize.toast('Uh Oh! Looks like you missed a spot.', 4000,'validationError');
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
		//number of allowed fields
		let fieldTot = 5;

		let keys = Object.keys(pos);
    if(keys.length>=1){
			//get array of keys of parts of speach


			//look at each key and create a key for each IF LESS THAN 5 POS
			keys.forEach(key=>{
				let part = pos[key];
				console.log(key, part);
				part.forEach((obj, index, arr) => {
					//Sanitize/set field name
					let fieldName = '';
					if(key === 'handle'){
						fieldName = 'Twitter Handle';
					}else{
						fieldName = key.charAt(0).toUpperCase()+key.slice(1);
					}

					let $input =
					'<div class=\'input-field '+key+'\'>'+
							'<input type=\'text\' name='+key+''+index+' class=\'qField '+key+'\'>'+
									'<label class=\'qLabel\' for=\''+key+''+index+'\'>'+
											fieldName+
									'</label>'+
							'</input>'+
					'</div>';
					$input = $($input);
					$('.buttonBox').before($input);
				});
			});


    }else{
      //if no POS in tweet move on to the next tweet recursively
    }
  }
