const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const queryString = require('querystring')
const Review = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    let review = new Review();
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    review.userName = faker.internet.userName();
    review.text = faker.lorem.sentence();

    product.save((err) => {
      if (err) throw err
    })

    review.save((err) => {
      if (err) throw err
    })
  }
  res.end('Success!')
})

//GET all products with a limit of 40 per page
router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.send(products)
      })
    })
})

//GET products by id
// router.get('/products/:product', (req, res) => {
//   const { product } = req.params;
//   //this doesn't work :(
//   if (!product) {
//     res.writeHead(404, 'Product Not Found');
//     return res.end("Product Not Found!");
//   }
//   Product.find({_id: product}).exec((err, product)=> {
//     if (err) {
//       console.log(err)
//     }
//       res.send(JSON.stringify(product))
//   })
// })

router.get('/products/:product', (req, res) => {
  Product.findById(req.params.product, (err, product) =>{
    res.send(product)
  })
})

//GET all reviews with a limit of 40 per page
router.get('/reviews', (req, res, next) => {
  const perPage = 40

  // return the first page by default
  const page = req.query.page || 1

  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Review.count().exec((err, count) => {
        if (err) return next(err)
        res.send(reviews)
      })
    })
})

//POST /products: Creates a new product in the database 
router.post('/products', (req, res) => {
//   let newProduct = new Product();

//   newProduct.category = req.body.category;
//   newProduct.name = req.body.name;
//   newProduct.price = req.body.price;
//   newProduct.image = req.body.image;

//   newProduct.save((err) => {
//     if (err) throw err
//   })
//   res.send(`${newProduct.name} has been added to the database`)
// })
  let newProduct = new Product(req.body);
  newProduct.save()
  res.send(`${newProduct.name} has been successfully added to the database`);
})
//POST /:product/review: Creates a new review in the database by adding it to the correct product's reviews array.
router.post('/products/:product/review', (req, res) => {
  //find product by id
  Product.findById(req.params.product, (err, product) => {   
    let newReview = new Review(req.body);
    newReview.save();
    product.reviews.push(newReview._id);
  })
  res.send(`Review has been successfully added to the product`);
})

//DELETE /products/:product: Deletes a product by id
router.delete('/products/:product', (req, res) => {
  //find the product by the id
  let productToRemoveId = req.params.product;
  Product.remove({_id: productToRemoveId}, (err, product) =>{
    if (err) throw err;
  
    // product.remove((err) => {
    //   if (err) throw err;
    // }) 
    res.send(`This product has been successfully removed from database`)
  })
})

//DELETE /reviews/:review : Deletes a review by id
router.delete('/reviews/:review', (req, res) => {

})


module.exports = router


