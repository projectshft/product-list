const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/products', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

const mainRoutes = require('./routes/main');

app.use(mainRoutes);

// app.get('/products/:product', (req, res) => {
// 	res.send(`You want to see ${req.params.product}?`);
// });

// app.get('/products/:product/reviews', (req, res) => {
// 	res.send(`hey oh, check out this review: ${req.params.product.reviews[0]}`);
// });








app.listen(8000, () => {
	console.log('Node.js listening on port ' + 8000);
});




	



