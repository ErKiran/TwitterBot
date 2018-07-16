const express = require('express');
const app = express();
require('./app');
require('./follow');
//require('./unsplashapi');

const port = process.env.PORT||5000;
app.listen(port,()=>{
	console.log(`Server is running at port ${port}`);
})