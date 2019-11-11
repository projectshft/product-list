const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const displayRoutes = require('express-routemap');

mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true })

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mainRoutes = require('./routes/main')
const productRoutes = require('./routes/products')
const reviewRoutes = require('./routes/reviews')
const adminRouter = require('./routes/admin');

app.use('/', mainRoutes)
app.use('/products', productRoutes)
app.use('/reviews', reviewRoutes)
app.use('/admin', adminRouter);


app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
  displayRoutes(app);
})