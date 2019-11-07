const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const bodyParser = require('body-parser')
const cors = require('cors')

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})

const app = express()

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))



const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})