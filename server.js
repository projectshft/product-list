const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors') // Import the cors package

mongoose.connect('mongodb://127.0.0.1/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express()

app.use(cors()) // Use the cors middleware

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
    console.log('Node.js listening on port ' + 8000)
})
