const router = require('express').Router()
const faker = require('faker')
const { Product } = require('../models/product')
const { Review } = require('../models/product')


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

router.get('/products/:product/reviews', (req, res, next) => {

  
});

router.post('/products/', (req, res, next) => {
    
  if (!req.body.category || !req.body.name || !req.body.price || !req.body.image) {
    response.writeHead(404, "Not enough product information");
    return response.end();
  }
  
  let product = new Product()

  product.category = req.body.category
  product.name = req.body.name
  product.price = req.body.price
  product.image = req.body.image

  product.save((err) => {
    if (err) throw err
  })

  res.send(`Added New Product named: ${product.name}`)
});

router.post('/products/:product/reviews', (req, res, next) => {

  let productId = req.params.product
  let reviewUserName = req.body.userName
  let reviewText = req.body.text

  let review = new Review({
    userName: reviewUserName,
    text: reviewText,
  });

  Product.findById({ _id: productId }, (err, result) => {
    if (err) {
      return console.error(err);
    }
    console.log(result)
    result.reviews.push(review)
    //save review
    result.save(() => {
      //Send back review that was added
      return res.send(review)
    })
  });
  
});


module.exports = router