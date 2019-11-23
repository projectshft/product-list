const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/reviews')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()
    let review = new Review()
//Uses Faker to create fake products and reviews
    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
    review.username = faker.name.firstName()
    review.text = faker.lorem.sentence()
    review.product = product._id
    product.reviews = review
    // creates review collection
    review.save((err) => {
      if (err) throw err
    })//save product after review is created to make sure its ref is in product collection
    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
});

router.get('/products', (req, res, next) => {
  const perPage = 9
  let numberOfPages

  // return the first page by default
  const page = req.query.page || 1
  if(req.query.category) {
    if(req.query.price == 'highest') {
    Product
    .find({category: req.query.category})
    .sort('-price')
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count({category: req.query.category}).exec((err, count) => {
        if (err) return next(err)
        else numberOfPages= Math.ceil(count/perPage)
        res.send({products: products, count: count, numberOfPages, page: parseInt(page) })
      });
    }); 
  } else if (req.query.price == 'lowest') {
    Product
    .find({category: req.query.category})
    .sort('price')
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count({category: req.query.category}).exec((err, count) => {
        if (err) return next(err)

        else numberOfPages= Math.ceil(count/perPage)
        res.send({products: products, count: count, numberOfPages, page: parseInt(page) })
      });
    });
  } else {
    Product
    .find({category: req.query.category})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.count({category: req.query.category}).exec((err, count) => {
        if (err) return next(err)
        
        else numberOfPages= Math.ceil(count/perPage)
        res.send({products: products, count: count, numberOfPages, page: parseInt(page) })
        });
      });
    }
  } else {
    if(req.query.price == 'highest') {
      Product
      .find({})
      .sort('-price')
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((err, count) => {
          if (err) return next(err)
          
          else numberOfPages= Math.ceil(count/perPage)
          res.send({products: products, count: count, numberOfPages, page: parseInt(page) })
        });
      }); 
    } else if (req.query.price == 'lowest') {
      Product
      .find({})
      .sort('price')
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((err, count) => {
          if (err) return next(err)
          
          else numberOfPages= Math.ceil(count/perPage)
          res.send({products: products, count: count, numberOfPages, page: parseInt(page) })
        });
      });
    } else {
      Product
      .find({})
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
        Product.count().exec((err, count) => {
          if (err) return next(err)
  
          else numberOfPages= Math.ceil(count/perPage)
          res.send({products: products, count: count, numberOfPages, page: parseInt(page) })
          });
        });
      }
  }
});

router.get('/products/:product',(req, res, next) =>{
  Product
    .findById(req.params.product)
    .limit(1)
    .exec((err,product)=> {
        if (err) return next(err)

        res.send(product)
    });
});

router.get('/reviews', (req, res, next) =>{
  const perPage = 40;
  const page = req.query.page || 1
  Review
    .find({})
    .limit(perPage)
    .skip((perPage * page) - perPage)
    .exec((err, review)=>{
      if (err) {
        return next(err)
      } else {
        res.send(review);
      }
    });
});

router.post('/products', (req, res, next) =>{
  let newProduct = new Product()

  newProduct.category = req.body.category || null
  newProduct.name = req.body.name
  newProduct.price = req.body.price
  newProduct.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
  newProduct.reviews = req.body.reviews || []
  newProduct.save((err) => {
    if (err) throw err
  })

  res.end();
});

router.post('/:product/reviews', (req, res, next) =>{
  let newReview = new Review()

  newReview.username = req.body.username
  newReview.text = req.body.text
  newReview.product = req.params.product
  newReview.save((err) =>{
    if (err) throw err
  });

  Product
    .findById(req.params.product)
    .exec((err, product) =>{
      if (err) throw err
      product.reviews = newReview._id
      product.save((err) =>{
        if (err) throw err
      });
    });
  res.end();
});

router.delete('/products/:product', (req,res) =>{
  Product
    .findById(req.params.product)
    .remove()
    .exec();
  res.end(console.log('Product Deleted'));
});

router.delete('/reviews/:review', (req,res) => {
    Review
    .findById(req.params.review)
    .remove()
    .exec();
  res.end(console.log('Review Deleted'))
});

module.exports = router