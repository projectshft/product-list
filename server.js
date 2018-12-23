const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/productsDB')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: true
}))

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
   console.log('Node.js is listening on port ' + 8000)
})