const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const mainRoutes = require('./routes/main');

app.use(mainRoutes);

const productsRoutes = require('./routes/products');

app.use('/products', productsRoutes);

const reviewsRoutes = require('./routes/reviews');

app.use('/reviews', reviewsRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`Node.js listening on port ${port}`);
});
