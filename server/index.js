const express = require('express')
const http = require('http');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const mainRoutes = require('./router')
const cors = require('cors');
const keys = require('./config/keys');

mongoose.connect(keys.MONGODB_URI)

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


app.use(mainRoutes)

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);