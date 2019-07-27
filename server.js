const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mainRoute = require('./Server-Side/routes/main')
const productsRoute = require('./Server-Side/routes/products')
const reviewsRoute = require('./Server-Side/routes/reviews')

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(mainRoute)
app.use(productsRoute)
app.use(reviewsRoute)

const mainRoutes = require('./Server-Side/routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})