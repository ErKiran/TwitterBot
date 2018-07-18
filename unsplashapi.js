const axios = require('axios');
var API_KEY = '9564207-61b4c5ab3ad83576f2afa93ef';
var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
  axios.get(URL)
  .then(function (response) {
    // handle success
    console.log(response);
  });