const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Product = require('./models/products')
const Review = require('./models/reviews')

mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true })

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

// const fakeProduct = new Product({
//     category: 'Books',
//     name: 'Harry Potter',
//     price: 200,
//     image: '',
//     reviews: []
// });

// fakeProduct.save();

// fakeProduct.reviews.push({ userName: 'Dave', text: 'this thing smells like poop' })


