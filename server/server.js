const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


// app.use(function(request, response, next) {
//   response.header("Access-Control-Allow-Origin", '*');
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const mainRoutes = require('./routes/main')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Listening on port ' + 8000)
})
