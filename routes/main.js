const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')

// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})

router.get('/products/:product', (req, res, next) => {
  //retrieving product id from request and assigning to variable
  let productId = req.params.product
  
  if(!productId) {
    response.writeHead(404, "Unable to find product");
    return response.end();
  }
  
  Product.findById({ _id: productId }, (err, result) => {
    if (err) {
      return console.error(err);
    }
    console.log(result);
    //send product by productId
    return res.send(result)
  });
  
});



module.exports = router