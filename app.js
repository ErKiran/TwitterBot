const Twitter = require('twitter');
const axios = require('axios');
const Keys = require('./config/key');
const emoji = require('./emoji.json');
const { setemoji } = require('./helpers/setemoji')
const { sethashtags } = require('./helpers/sethashtags')
const API_URL = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const Hero = new Twitter(Keys);



const getQuote = async () => {
  try {
    const response = await axios.get(API_URL);
    let quoteText = response.data.quoteText;
    let author = response.data.quoteAuthor || "Unknown";
    let fullQuote = `"${quoteText}"` + " - " + ` ${author}`

    if (quoteText !== 'undefined') {
      console.log(fullQuote)
      let config = {
        headers: {
          'User-agent': 'Mozilla/4.0 Custom User Agent'
        }
      }
      let data = {
        "features": { "concepts": {}, "entities": {}, "keywords": {}, "categories": {}, "emotion": {}, "sentiment": {}, "semantic_roles": {}, "syntax": { "tokens": { "lemma": true, "part_of_speech": true }, "sentences": true } },
        "text": quoteText
      }
      const AIData = await axios.post('https://natural-language-understanding-demo.ng.bluemix.net/api/analyze', data, config)
      const emotions = AIData.data.results.emotion.document.emotion;
      const keywords = AIData.data.results.keywords;
      const categories = AIData.data.results.categories;
      const concepts = AIData.data.results.concepts;
      const entities = AIData.data.results.entities;
      const sentiment = AIData.data.results.sentiment;
      console.log("Emotions", emotions)
      const tags = sethashtags(keywords)

      /* const image = await axios.get('https://api.unsplash.com/search/photos', {
         params: {
           query: 'nepal',
           client_id: Keys.unsplash_access_key
         },
         headers: {
           Authorization: Keys.unsplash_access_key
         }
       })
 
       const pexel = await axios.get('https://api.pexels.com/v1/search', {
         params: {
           query: 'Step'
         },
         headers: {
           Authorization: Keys.pexels
         }
       })
       //console.log("Pexel", pexel.data)
       const term = 'step'
 
       const pixabay = await axios.get(`https://pixabay.com/api/?key=13993130-87b50e7e5630b92415efa4923&q=${term}&image_type=photo`, {
       })*/


      const predicted_emoji = setemoji(sentiment, emotions)
      const emotweet = `${emoji[predicted_emoji.split('.')[0]][predicted_emoji.split('.')[1]]}`


      if (tags.length !== 0) {

        let status = {
          status: `${fullQuote} #Quotes ${tags.map(i => i)} ${emotweet} ${emotweet}`
        }
        Hero.post('statuses/update', status, function (error) {
          if (error) {
            console.log(error);
          }
        });
      }
      else {
        let status = {
          status: `${fullQuote} #Quotes  ${emotweet} ${emotweet}`
        }
        Hero.post('statuses/update', status, function (error) {
          if (error) {
            console.log(error);
          }
        });
      }
    }
  }
  catch (e) {
    throw e
  }
}

setInterval(getQuote, 60*60*1000);







