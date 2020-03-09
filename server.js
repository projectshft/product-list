const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//connecting to database
mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//using cors to connect server and react
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); 
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));
app.use(express.static('node_modules'));

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})