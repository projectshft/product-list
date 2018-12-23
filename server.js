const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

mongoose.connect('mongodb://localhost/products')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors());

const mainRoutes = require('./routes/main')
const productRoutes = require('./routes/products');

app.use('/', mainRoutes)
app.use('/products', productRoutes);

app.listen(5000, () => {
  console.log('Node.js listening on port ' + 5000)
})