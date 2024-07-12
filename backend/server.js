const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const fakeData = require('./routes/fakeData');

mongoose.connect('mongodb://localhost/products');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Workaround for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/get-fake-data', fakeData);
app.use('/products', products);

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000);
});

module.exports = app;