const Twitter = require('twitter');
const Keys= require('./config/key');
const request = require('request');
const requestPromise = require('request-promise');
const API_URL = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const Hero = new Twitter(Keys);
 var params = {
    q: '#WC2018,#BEGvFRA,#FRAvBEG,#FIFA,#WorldCup',
    result_type: 'mixed recent',
    lang: 'en'    
  } 


const getQuote = (() => {
    
    /* request options */
    const OPTIONS = {
        uri: API_URL,
        json: true
    };
     requestPromise( OPTIONS )
        /* Successful call */
        .then( (response) => {
            if ( !response )
                getQuote();

            let quoteText = response.quoteText;
            let author = response.quoteAuthor || "Unknown";
            let fullQuote = quoteText + "- " + author
            
            printQuote( fullQuote );
            Hero.post('statuses/update', {status: fullQuote}, function(error, tweet, response){
		if(error){
		console.log(error);
		}
		console.log(tweet); // Tweet body.
		console.log(response); // Raw response object.
});
        })

        /* Handling errors */
        .catch( (err) => {
            console.log("Unable to retrieve quote, try again");
        })
         
})();
let printQuote = (fullQuote) => {
    console.log( fullQuote )
} 

 

 Hero.stream('statuses/filter', {track: '#WC2018,#BEGvFRA,#FRAvBEG,#FIFA,#WorldCup', lang: 'en'}, function(stream) {
stream.on('data', function(tweet) {
console.log(tweet.text);
});
stream.on('error', function(error) {
console.log(error);
});
});
 Hero.get('search/tweets', params, function(err, data, response) {
  // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }
      // Try to Favorite the selected Tweet
      Hero.post('favorites/create', id, function(err, response){
        // If the favorite fails, log the error message
        if(err){
          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})
