const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/main');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const mainRoutes = require('./routes/main');

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true, useUnifiedTopology: true } );

app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, XMLHttp");
//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

router(app);

// app.use(mainRoutes);


app.listen(8000, () => {
  console.log('Server listening on port ' + 8000);
});
      