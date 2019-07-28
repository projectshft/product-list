const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')
const ObjectId = require('mongoose').Types.ObjectId

const categoryArray = ["Automotive", "Baby", "Beauty", "Books", "Clothing", "Computers", "Electronics", "Games", "Garden", "Grocery", "Health", "Home", "Industrial", "Jewelery", "Kids", "Movies", "Music", "Outdoors", "Shoes", "Sports", "Tools", "Toys"]

// Helper function performs case-insensitive match between query and category in database
const searchArray = function(element, array) {
    const len = array.length, str = element.toLowerCase();
    for ( var i = 0; i < len; i++ ) {
        if ( array[i].toLowerCase() == str ) { return i; }
    }
    return -1;
}

// GET /generate-fake-data --- generates products and reviews  
// note: products/reviews are related with refs 
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {

    let product = new Product()

    // create three reviews per product for testing purposes 
    for (let i = 0; i < 3; i++) {
      let review = new Review()
      review.userName = faker.internet.userName()
      review.text = faker.commerce.productAdjective() + '!'
      review.product = product._id
      // each review is given the product's _id, then added (by ref) to reviews array
      review.save((err) => {
        if (err) throw err
      })
      product.reviews.push(review)
    }

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    // faker imageUrl generates the link 'http://lorempixel.com/640/480', so when page 
    // first loads, all images are the same. for products that persist through state 
    // changes, the image stays the same, while new products get a different image... 
    // nicely highlights react/redux efficiency! 
    product.image = faker.image.imageUrl()

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

// GET /products --- returns all products (paginated)
router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page if no page is specified (with ||); floor handles non-integers;  
  // return the max value of 1 and a given page if specified (max handles 0 and negative integers); 
  let page = Math.max(Math.floor(req.query.page || 1), 1)

  // set defaults for # of products and max # of pages (sent back in response)
  let productCount = 0
  let maxPages = 1

  // get queries: category (for filter) and price (for sorting)  
  let category = req.query.category || ''
  let price = req.query.price || ''

  // check category query and set param for product filtering accordingly. 
  // use searchArray to perform case-insensitive match, and update category sent 
  // back in the response (if there's a match). 
  const categoryIndex = searchArray(category, categoryArray);
  category = (categoryIndex > -1)? categoryArray[categoryIndex]: category;
  const filterCategory = (category.length > 0) ? { category: category } : {}

  // check price query and set param for product sorting accordingly. 
  // since 'price' is sent back in the response, manipulate it if it's valid (lower case) 
  // or set it to an empty string if it isn't valid (thus no sorting happens)
  const getSort = function (sortParam) {
    const priceLC = sortParam.toLowerCase();
    switch (priceLC) {
      case '':
        return {};
      case 'lowest':
        price = priceLC;
        return { price: 'asc' };
      case 'highest':
        price = priceLC;
        return { price: 'desc' };
      default:
        price = '';
        return ''; // maybe to do: use this return value to handle error reporting?  
    }
  }
  const sortPrice = getSort(price)

  // perform countDocuments first in order to calculate maxPages and reset page if necessary 
  Product.countDocuments(filterCategory).exec((err, count) => {
    if (err) return next(err)
    // return the max number of pages possible for given group of query results 
    maxPages = Math.max(Math.ceil(count / perPage), 1)
    page = Math.min(page, maxPages)
    productCount = count

    Product.find(filterCategory)
      .sort(sortPrice)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, products) => {
        if (err) return next(err)
        res.send({
          count: productCount,
          page: page,
          maxPages: maxPages,
          category: category,
          price: price,
          products: products
        })
      })
  })
})

// GET /products/:productId --- returns a specific product by its id
router.get('/products/:productId', (req, res, next) => {
  const { productId } = req.params
  if (!ObjectId.isValid(productId)) {
    res.writeHead(400, "Invalid product ID")
    return res.end()
  } else {
    Product.find({ _id: productId }, (err, product) => {
      if (err) return next(err)
      if (product.length === 0) {
        res.writeHead(404, "Product does not exist")
        return res.end()
      }
      res.send(product)
    })
  }
})

//GET /reviews --- returns all reviews (paginated)
router.get('/reviews', (req, res, next) => {
  const perPage = 40
  // return the first page by default
  const page = Math.max(Math.floor(req.query.page || 1), 1)

  Review
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      if (err) return next(err)
      // use `count` to know how many are coming back
      Review.countDocuments().exec((err, count) => {
        if (err) return next(err)
        res.send(reviews)
      })
    })
})

// POST /products --- creates a new product in the database
router.post('/products', (req, res, next) => {
  let product = new Product()
  product.category = req.body.category || ''
  product.name = req.body.name || ''
  product.price = req.body.price || 0
  product.image = req.body.image || 'http://lorempixel.com/640/480'

  product.save((err) => {
    if (err) throw err
  })
  res.send(product)
})

// POST /:productId/reviews --- creates a new review in the database 
// by adding it to the correct product's reviews array 
router.post('/:productId/reviews', (req, res, next) => {
  const { productId } = req.params

  Product.findById(productId, (err, product) => {
    if (err) throw err

    let review = new Review()
    review.userName = req.body.userName || ''
    review.text = req.body.text || ''
    review.product = product._id
    review.save((err) => {
      if (err) throw err
    })

    product.reviews.push(review)

    product.save((err) => {
      if (err) throw err
      res.send(review)
    })
  })
})

// DELETE /products/:productId --- deletes a product by id
router.delete('/products/:productId', (req, res, next) => {
  const { productId } = req.params
  Product.deleteOne({ _id: productId }, (err) => {
    if (err) return next(err)
    res.send()
  })
})

// DELETE /reviews/:reviewId --- deletes a review by id
router.delete('/reviews/:reviewId', (req, res, next) => {
  const { reviewId } = req.params
  Review.deleteOne({ _id: reviewId }, (err) => {
    if (err) return next(err)
    res.send()
  })
})

module.exports = router