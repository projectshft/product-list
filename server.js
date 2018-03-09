const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect("mongodb://localhost/products")

const app = express()
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Node.js listening on port ' + PORT)
})
