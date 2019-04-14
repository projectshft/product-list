const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(
  'mongodb://localhost/productsDB',
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
  err => {
    if (err) console.error(err);
    console.log('Connected to database...');
  }
);

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors middleware
const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept, X-Authentication',
  'Content-Type': 'application/json'
};

app.use((req, res, next) => {
  res.set(HEADERS);
  next();
});

// Set up routes
app.use('/', require('./routes/main'));
app.use('/products', require('./routes/products'));
app.use('/reviews', require('./routes/reviews'));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
