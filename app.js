const Twitter = require('twitter');
const axios = require('axios');
const Keys = require('./config/key');
const { setemoji } = require('./helpers/setemoji')
const API_URL = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const Hero = new Twitter(Keys);



const getQuote = (async () => {
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
      //console.log("Emotions", emotions)
      //console.log("Keywords", keywords)
      //console.log("Categories", categories)
      //console.log("Concepts", concepts)
      //console.log("Entities", entities)
      //console.log("Sentiment", sentiment)
      const test = setemoji(sentiment, emotions)
      console.log(test)


      /*Hero.post('statuses/update', { status: fullQuote + '😊😊#Quotes' }, function (error) {
        if (error) {
          console.log(error);
        }
      });*/
    }
  }
  catch (e) {
    throw e
  }
})()






