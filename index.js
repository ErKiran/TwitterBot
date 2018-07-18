const express = require('express');
const app = express();
require('./app');
require('./follow');
app.use(express.static('public'));

//require('./unsplashapi');
app.get('/', (req, res) => res.send('This twitter bot is running live at https://twitter.com/CoastQuote'));
const port = process.env.PORT||5000;
app.listen(port,()=>{
	console.log(`Server is running at port ${port}`);
})