const router = require('express').Router()
const faker = require('faker')
const Products = require('../models/product')
const Reviews = require('../models/review')

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://via.placeholder.com/250?text=Product+Image'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  const perPage = 9

  // return the first page by default
  const page = req.query.page || 1

  const searchedCategory = req.query.category
  
  const searchQuery = req.query.search

  let productSearch
    if (searchedCategory && searchQuery) {
      productSearch = { $and: [{ category: searchedCategory },  { search: searchQuery } ] }
    
    } else if (searchedCategory) {
      productSearch = { category: searchedCategory }
    }
    
    else if (searchQuery) {
      productSearch =  { search: searchQuery } 
    }
    
    let price
    if (req.query.price == 'highest') {
        price = { price: -1 }
    } else if (req.query.price == 'lowest') {
        price = { price: 1 }
    }

  Products
    .find(productSearch)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .sort(price)
    .exec((error, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Products.count(productSearch).exec((err, count) => {
        if (err) return next(err)

        res.send({products: products, productCount: count})
      })
    })
})

// Returns a specific product by its id 
router.get('/products/:product', (request, response, next) => {
  const productId = request.params.product;

  
  Product
    .findById(productId, (error, product) => {
      if (error) return next(error)
      
        response.send(product);
      
    })
});


// creates a new product
router.post('/products', (req, res, next) => {
  let newProduct = new Product();

  newProduct.category = req.body.category;
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.image = req.body.image;
  newProduct.reviews = [];

  newProduct.save((err, prod) => {
    if (err) throw err
    
  })
  res.send(prod);
});

// create a review
router.post('/products/:product/reviews', (req, res, next) => {
  

  // check to see if product is in db
  Product.findById(req.params.product).exec((err, product) => {
    
    if (err) return next(err)

   
    const newReview = new Review()
    newReview.userName = req.body.userName
    newReview.text = req.body.text
    newReview.product = req.params.product
    

    // save it
    newReview.save((err, review) => {
      if (err) throw err

      res.send(review)
    });

    // add to product reviews, save the product
    product.reviews.push(newReview);
    product.save((err, prod) => {
      if (err) return next(err);
      
      res.send(prod);
    });
  });
});

router.get('/products/:product/reviews', (req, res, next) => {
  const perPage = 4
  // return the first page by default
  const page = req.query.page || 1
  //searches for all review but limits to 4
  Product
      .findById(req.params.product)
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate('reviews', 'reviewText')
      .exec((err, reviews) => {
          Review.count().exec((err, count) => {
              if (err) return next(err)
              res.send(reviews)
          })
      })
})

// Deletes a product by id
router.delete('/products/:product', (req, res, next) => {
  const productId = req.params.product;

  Product.findByIdAndDelete(productId, (error, result) => {
    if (error) console.log(error);
    res.send(result);
  });
});


// Deletes a review by id
router.delete('/reviews/:review', (req, res, next) => {
  const reviewId = req.params.review;

  Review.findByIdAndDelete(reviewId, (error, result) => {
    if (error) console.log(erorr);
    res.send(result);
  });
});

module.exports = router