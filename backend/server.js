const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect('mongodb://localhost/productsDB', {useNewUrlParser: true});

const app = express();

//only want to allow cors to react dev server
//make sure to set postman header- Origin: localhost:5000
//react on localhost:3000
const whitelist = ['localhost:3000','localhost:5000'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const mainRoutes = require('./routes/main');

app.use(mainRoutes);

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
});