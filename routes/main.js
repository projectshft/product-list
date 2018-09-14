const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

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
})

router.get('/products', (req, res, next) => {
  const perPage = 5
  const page = req.query.page || 1

  Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.send(products)
      })
    })
});

router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if(err) { 
      return next(err)
    }
    res.send(product);
  });
});

router.get('/reviews', (req, res, next) => {
 Review
  .find({})
  .limit(5)
  .exec((err, reviews) => {
    Review.count().exec((err, count) => {
      if (err) return next(err)
      res.send(reviews)
    })
  })
});

router.post('/products', (req, res, next) => {
  let newProduct = new Product(req.body);
  newProduct.save();
  if (err) return res.status(500).send(err);
  return res.status(200).send(newProduct);
});

router.post('/:id/reviews', (req, res, next) => {
  let newReview = new Review(req.body);
  Product.findOneAndUpdate(req.params.id, newReview, (err, reviews)  => {
    if (err) return res.status(500).send(err);
    return res.send(review);
  })
});

router.delete('/products/:id', (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, (err, todo) => {
    if(err) return res.status(500).send(err);
    const response ={
      message: "Product successfully deleted",
      id: product._id
    };
    return res.status(200).send(response);
  });
});

router.delete('/reviews/:reviewId', (req, res, next) => {
  Review.findByIdAndRemove(req.params.id, (err, review) => {
    if(err) return res.status(500).send(err);
    const response = {
      message: "Review successfully deleted",
      id: review._id
    };
    return res.status(200).send(response);
  });
});

module.exports = router