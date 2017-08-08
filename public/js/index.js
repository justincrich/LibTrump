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

const spinner =
'<div id="tweetCardLoadSpinner">'+
	'<div class="preloader-wrapper small active">'+
					'<div class="spinner-layer spinner-green-only">'+
							'<div class="circle-clipper left">'+
									'<div class="circle"></div>'+
							'</div><div class="gap-patch">'+
									'<div class="circle"></div>'+
							'</div><div class="circle-clipper right">'+
									'<div class="circle"></div>'+
							'</div>'+
					'</div>'+
			'</div>'+
'</div>';
//load the tweets into the store
//start loading processer
$('#formIndicator').show();
fetch("/tweet/10")
  .then(res=> {
    return res.json();
  })
  .then(json=>{
    loading = false;
    tweetStore = json;
    console.log('tweets',tweetStore);
    //selectedTweet = tweetStore.shift();
		selectedTweet = tweetStore[0];
		$('#formIndicator').hide();
    loadInput(selectedTweet.pos, selectedTweet.totPOSCount);
  });

  $( document ).ready(function() {

		/*--------------MODAL FUNCTIONALITY-----------------*/
			$('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      complete: function() {
				$('#moreTweetsModalIndex .modal-content .modal-tweets').empty();
			} // Callback for Modal close
    });

			//handle pick a tweet activity
			$('#formMoreTweetsBtn').on('click',()=>{


				if(tweetStore.length<0 && loading === false){
					//what happens if there are no tweets received
					$('#libATweetTab').append(
						"<h5 class='tweetNotFoundNotice'>'Error, No Tweets Found, Come Back Later'</h5>");
				}else{
					//Otherwise show tweets
					showTweetList(tweetStore);
				}
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


			//Load more tweet when user scrolls to bottom of tweet div
			$('.modal-tweets').on('scroll',(e)=>{
				let elem = $(e.currentTarget);
		    if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight() && loading==false) {
						loading = true;
						let $spinner = $(spinner);
						$('.modal-tweets').append($spinner);
						let allCards = document.getElementsByClassName('tweetContainer');
						let lastID = allCards[allCards.length-1].id;
						console.log(lastID);
						fetch("/tweet/10/"+lastID)
						  .then(res=> {
						    return res.json();
						  })
						  .then(json=>{
						    loading = false;
								console.log(json);
						    //tweetStore = tweetStore.concat(json);
								//get rid of dup tweet
								json.shift();
								showTweetList(json);

						  });
		    }
			});

			//Close modal when little X is clicked
			$('#moreTweetsModalIndex')
			.on('click',(e)=>{
				$('#moreTweetsModalIndex').modal('close');
			});

  });

	function showTweetList(tweetsArr){
		tweetsArr.forEach((tweet,index,arr)=>{
			let card = createTweetCard(tweet);
			card.click((e)=>{
				let id = $(e.target).closest(".tweetContainer").attr('id');
				//selectedTweet = tweetStore.splice(id,1)[0];
				selectedTweet = tweet;
				$('#libATweetTab').contents(':not(.buttonBox)').remove();
				loadInput(selectedTweet.pos,selectedTweet.totPOSCount);
				$('#moreTweetsModalIndex').modal('close');
			});
			$('#moreTweetsModalIndex .modal-content .modal-tweets').append(
				card);
			loading = false;
			$('#tweetCardLoadSpinner').remove();
		});
	}

  function createTweetCard (tweet){
    let $div = $(tweetCard);
    $($div).attr('id',tweet.id);
		//$($div).attr('class','tweetBodyCard');
    $($div).find('.tweetTextContainer .text').append(tweet.text);
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
