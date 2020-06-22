const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/product')

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

router.param('product', (req, res, next, id) => {
  req.product = Product.find({
    _id: id
  });
  next();
});

router.param('review', (req, res, next, id) => {
  req.product = Review.find({
    _id: id
  });
  next();
})

router.get('/products', (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1
  // optional categories. TODO: standardize case for Category and Query
  const filterByCategory = req.query.category;
  const sortByPrice = req.query.price;
  const filterByQuery = req.query.query;
  query = {};
  sort = {};

  if (filterByCategory) {
    query.category = filterByCategory;
  }

  if (filterByQuery) {
    query.name = {$regex: filterByQuery };
  }

  if (sortByPrice) {
    if (sortByPrice === "highest") {
    sort.price = -1; //highest to lowest- descending
    }
    if (sortByPrice === "lowest") {
      sort.price = 1; //lowest to highest- ascending
    }
  }

  Product
    .find(query)
    .sort(sort)
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, 
      //but in the future we might want to know how many are coming back 
      // so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err)

        res.send(products)
      })
    })
})

router.get('/products/:product', (req, res) => {
  // Using the product params
  req.product.exec((err, product) => {
    // If no id exists, throw an error
    if (err) throw err;
    //Otherwise, return the product 
    res.send(product);
  })
})

router.get('/products/:product/reviews', (req, res) => {
  // Only 4 per page
  const perPage = 4;
  // return the first page by default
  const page = req.query.page || 1;
  // Find product by Id
  Product
    .findOne({
      _id: req.params.product
    })
    .populate({
      path: 'reviews',
      // .skip((perPage * page) - perPage)
    })
    .exec((err, product) => {
      if (err) throw err;
      let reviewPage = [];
      for (i = ((perPage * page) - perPage); i < ((perPage * page) - perPage) + 4; i++) {
        if (i < product.reviews.length) {
          reviewPage.push(product.reviews[i])
        }
      }
      res.send(reviewPage);
    });
})


router.post('/products', (req, res) => {
  let product = new Product();

  product.category = req.body.category; // need edge case
  product.name = req.body.name; // edge case needed
  product.price = req.body.price; // edge case needed
  product.image = req.body.image || 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';
  //product.reviews = req.body.reviews || [ReviewSchema];

  product.save((err) => {
    if (err) throw err
  })
  res.send(product);
})

router.delete('/products/:product', (req, res) => {

  Product
    .findOne({
      _id: req.params.product
    })
    .deleteOne({})
    .exec((err) => {
      if (err) throw err;
      else {console.log("Product successfully deleted!")
      }
    })
    
    res.send("Product successfully deleted");
})

router.post('/products/:product/reviews', (req, res) => {

  // Find product by Id
  Product
    .findById(req.params.product, (err, product) => {
      if (err) throw err;

      // Subdoc exists on product,
      // so we push the body of the request
      // to the selected product 
      product.reviews.push({
        userName: req.body.userName,
        text: req.body.text
      });

      // save product, console log success or error,
      // and return product in response
      product.save(err => {
        if (err) throw err;
        else console.log('Product successfully updated!');
      });
      res.send(product);
    });

})

router.delete('/products/:product/:review', (req, res) => {
  Product
    .findOne({
      _id: req.params.product
    })
    .exec((err, product) => {
      if (err) throw err;

      // Delete review and save product
      product.reviews.id(req.params.review).remove(); 

      product.save(err => {
        if (err) throw err;
        else console.log('Review successfully deleted!');
      });
      res.send("Review successfully deleted");
    });

});

module.exports = router