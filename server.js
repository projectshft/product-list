const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/products')

const app = express()

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000)