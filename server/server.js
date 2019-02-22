const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const cors = require('cors')

mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())

const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
app.use(productRoutes, reviewRoutes)

app.listen(8000, () => {
    console.log('Node.js -CORS-enabled web server listening on port ' + 8000)
})