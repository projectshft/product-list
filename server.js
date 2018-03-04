const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
mongoose.connect('mongodb://localhost/products')


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

const mainRoutes = require('./routes/main')
app.use(mainRoutes)

app.listen(8000, () => {
	console.log('Node.js listening on port ' + 8000)
})