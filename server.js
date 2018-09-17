const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/products')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// const testSchema = new mongoose.Schema({
//     message: String
// });

// const Test = mongoose.model('myTest', testSchema);

// let testMessage = new Test({message: 'this is my test this is my rest'});
// testMessage.save();

// console.log(testMessage);


const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})
