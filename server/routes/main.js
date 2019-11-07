const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const cookieSession = require('cookie-session')
const ObjectId = require('mongoose').Types.ObjectId
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
const PRODUCTS_PER_PAGE = 9;
const REVIEWS_PER_PAGE = 40;


//helper function to isolate product/review id from params and check if valid
let checkValidId = function (request, response) {
  if (request.params.product) {
    let id = request.params.product
    if (!ObjectId.isValid(id)) {
      return response.status(400).send('Invalid product Id.')
    }else{
      return id;
    }
  } else {
    let id = request.params.review
    if (!ObjectId.isValid(id)) {
      return response.status(400).send('Invalid review Id.')
    } else{
      return id;
    }
  }
}

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = faker.image.image()
    product.save((err) => {
      if (err) throw err
    })

    let review = new Review()
    review.userName = faker.internet.userName();
    review.text = faker.lorem.sentence();
    review.save();
    product.reviews.push(review);
    review.product = product;
  }
  res.end()
})



router.get('/products', (req, res, next) => {
  let pageNum = req.query.page || 1;
  let filter = req.query.category || {};
  let sort = req.query.price;

  if (pageNum < 1) {
    return res.status(400).send('Invalid page number.');
  }

  //refactored to ignore an 'object Object' string for sort..this is value if category is selected but sort is empty object in store

  if (!sort || sort === '[object Object]' || typeof sort !== 'string') {
    Product.find({ category: { $regex: new RegExp(filter, 'i') } })
      .skip((pageNum - 1) * PRODUCTS_PER_PAGE)
      .limit(PRODUCTS_PER_PAGE)
      .exec((err, result) => {
        //note countdocs will not count entire collection if the find parameters are passed in again
        Product.countDocuments({ category: { $regex: new RegExp(filter, 'i') } }).exec((err, count) => {
          if (err) {
            return next(err)
          } else {
            //calculate total pages for pagination on client-side
            let totalPages = Math.ceil(count / PRODUCTS_PER_PAGE)
            res.send({ products: result, pageCount: totalPages, currentPage: pageNum });
          }
        })
      })
  } else {
    if (sort === 'highest') {
      sort = 'descending';
    } else if (req.query.price === 'lowest') {
      sort = 'ascending';
    } else {
      return res.status(400).send('Invalid sort value.');
    }
    Product.find({ category: { $regex: new RegExp(filter, 'i') } })
      .skip((pageNum - 1) * PRODUCTS_PER_PAGE)
      .sort({ price: sort })
      .limit(PRODUCTS_PER_PAGE)
      .exec((err, result) => {
        //access to total count for future use
        Product.countDocuments({ category: { $regex: new RegExp(filter, 'i') } }).exec((err, count) => {
          if (err) {
            return next(err)
          } else {
            //calculate total pages for pagination on client-side
            let totalPages = Math.ceil(count / PRODUCTS_PER_PAGE)
            res.send({ products: result, pageCount: totalPages, currentPage: pageNum });
          }
        })
      })
  }
})

router.get('/products/:product', (req, res, next) => {
  let id = checkValidId(req, res);
  Product.findById(id)
    .exec((err, product) => {
      if (!product) {
        return res.status(404).send('Product not found.')
      }
      res.send(product);
    })
});

router.get('/reviews', (req, res, next) => {
  let pageNum = req.query.page || 1;
  if (pageNum < 1) {
    return res.status(400).send('Invalid page number.');
  }
  Review.find()
    .skip((pageNum - 1) * REVIEWS_PER_PAGE)
    .limit(REVIEWS_PER_PAGE)
    .exec((err, result) => {
      //access to total count for future use
      Review.countDocuments().exec((err, count) => {
        if (err) return next(err)

        res.send(result)
      })
    })
})

router.post('/products', (req, res, next) => {
  if (typeof req.body.category !== 'string' || typeof req.body.name !== 'string' || typeof req.body.price !== 'number' || typeof req.body.image !== 'string') {
    return res.status(400).send('Invalid request.')
  }
  let product = new Product(req.body)
  product.save((err) => {
    if (err) throw err
    res.send(product)
  })
});

router.post('/:product/reviews', (req, res, next) => {
  let id = checkValidId(req, res);
  Product.findById(id)
    .exec((err, product) => {
      if (!product) {
        return res.status(404).send('Product not found.')
      } else {
        let review = new Review(req.body)
        
        review.save()
        product.reviews.push(review)
        product.save((err, result) => {
          if (err) throw err
          res.send(product);
        })
      }
    })
});

//when product is deleted associated reviews will be deleted as well with middleware in product.js file
router.delete('/products/:product', (req, res, next) => {
  let id = checkValidId(req, res);
  Product.findById(id)
    .exec((err, product) => {
      if (!product) {
        return res.status(404).send('Product not found.')
      } else {
        product.remove(err => {
          if (err) throw err;
          res.status(200).send(`Product ${product._id} deleted!`)
        })
      }
    })
})

router.delete('/reviews/:review', (req, res, next) => {
  let id = checkValidId(req, res);
  Review.findById(id)
    .exec((err, review) => {
      if (!review) {
        return res.status(404).send('Product not found.')
      } else {
        review.remove(err => {
          if (err) throw err;
          res.status(200).send(`Review ${review._id} deleted!`)
        })
      }
    })
})


module.exports = router