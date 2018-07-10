const Twitter = require('twitter');
const Keys= require('./config/key');
const request = require('request');
const requestPromise = require('request-promise');
const API_URL = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const Hero = new Twitter(Keys);
 var params = {
    q: '#Nature',
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
 	/*stream.on('data', function(tweet) {
console.log(tweet.text);
var statusObj = {status: "Hey @" +
tweet.user.screen_name + ", Thanks for showing interest.? Who are you supporting?"} // If you want to annoy someone with irratating tweet
Twitter.post('statuses/update', statusObj, function(error,
tweetReply, response){
if(error){
console.log(error);
}
console.log(tweetReply.text);
});
});*/
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

 //To retweet Queries
 Hero.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Hero.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Sorry');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });

