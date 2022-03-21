const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productRouter = require('./routes/productRouter');

mongoose.connect(
  'mongodb://127.0.0.1/products',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log('mongdb is connected');
  }
);

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// next two lines enable the faker route to populate the db, only needed to be done once
// const fakerMaker = require('./routes/main');
// app.use(fakerMaker);

app.use('/products', productRouter);
app.get('/', (req, res, next) => res.send('Server is running.'));

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}`);
});

module.exports = app;
