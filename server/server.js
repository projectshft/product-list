const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mainRoutes = require('./routes/main')
const productRoutes = require('../routes/products')
const reviewRoutes = require('../routes/reviews')

app.use(mainRoutes)
app.use(productRoutes)
app.use(reviewRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})

