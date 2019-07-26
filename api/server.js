const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/psEval9', { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mainRoutes = require('./routes/main');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');

app.use('/', mainRoutes)
app.use('/products', productRoutes);
app.use('/reviews', reviewRoutes);

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})