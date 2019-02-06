const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
    console.log('Node.js -CORS-enabled web server listening on port ' + 8000)
})