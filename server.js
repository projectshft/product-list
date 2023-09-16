const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mainRoutes = require('./routes/main');

// connect to db
mongoose.connect('mongodb://localhost/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// set up server
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(mainRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Node.js listening on port ${PORT}`);
});
