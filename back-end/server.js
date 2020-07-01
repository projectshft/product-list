const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const mainRoutes = require('./routes/main')

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})

const app = express()
//using cors for server to server request
app.use(cors());

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})

