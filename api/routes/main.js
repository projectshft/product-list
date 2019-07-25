const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');

//new funny fake data, fo free
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
});

//GET route with pagination
router.get('/products', (req, res, next) => {
  let itemsPerPage = 9;
  let pageNumber = req.query.page || 1;
  let pageSkip = ((pageNumber * itemsPerPage) - itemsPerPage);
  Product.find().skip(pageSkip).limit(itemsPerPage).exec((err, result) =>{
    Product.count().exec((err,count) => {
      if(err) throw err;
      res.send(products);
    })
  })
})

//GET route for /products/:productId

//GET route for /reviews

//POST route for /products (adds product to DB)



module.exports = router;