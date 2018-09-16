const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Product = require('./models/product')

mongoose.connect('mongodb://localhost/products')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})

Product.find().exec((error, result) => {
    if (error) { return console.error(error); }
    console.log("These are your products");
    console.log(result);
});
