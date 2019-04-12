const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(
  'mongodb://localhost/productsDB',
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (err) console.error(err);
    console.log('Connected to database...');
  }
);

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use('/', require('./routes/main'));
app.use('/products', require('./routes/products'));
app.use('/reviews', require('./routes/reviews'));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
