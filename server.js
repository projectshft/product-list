const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRoute = require('./routes/main');
const productsRoute = require('./routes/products');
const reviewsRoute = require('./routes/reviews');

mongoose.connect('mongodb://localhost/products');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', mainRoute);
app.use('/products', productsRoute);
app.use('/reviews', reviewsRoute);

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000);
});
