const express = require('express');
const app = express();
require('./app');
app.use(express.static('public'));


const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
})