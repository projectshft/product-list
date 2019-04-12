const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/main');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');

const app = express();

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(mainRoutes);
app.use(productRoutes);
app.use(reviewRoutes);

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000);
})