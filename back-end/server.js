const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 5000;
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

app.use(cors());

const mainRoutes = require('./routes/main');

app.use(mainRoutes);

app.listen(PORT, () => {
  console.log(`Server running on at http://localhost:${PORT}`);
});
