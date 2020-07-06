const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mainRoutes = require('./server/routes/main')
const app = express()


mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))



app.use(mainRoutes)

app.listen(3001, () => {
  console.log('Node.js listening on port ' + 3001)
})