const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})

const app = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mainRoutes = require('./routes/main')

app.use(mainRoutes)


app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})
