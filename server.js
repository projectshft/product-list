const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const opn = require('opn');
const cors = require('cors');

const app = express();
const SERVER_PORT = process.env.PORT || 8000;
const CLIENT_PORT = 3000;
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true });

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const mainRoutes = require('./routes/main');
app.use(mainRoutes);

// Run server and console.log that server is up and running
app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
  console.log(`http://localhost:${SERVER_PORT}`);
});

// // Open client on server start
opn(`http://localhost:${CLIENT_PORT}`);
console.log(`Opening client on port ${CLIENT_PORT}`);

// create a test GET route
// app.get('/express_backend', (request, response) => {
//   response.send({
//     express: 'PS Product List EXPRESS BACKEND is now connected to React'
//   });
// });
