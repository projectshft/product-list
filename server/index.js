const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true, useUnifiedTopology: true})

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors())

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})