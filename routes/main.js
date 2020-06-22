const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

//gets a random number
var getRandomNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

//generates and adds fake data to the database
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';

    let numReviews = getRandomNumber(7);
    for (let i = 0; i < numReviews; i++) {
      let review = new Review({
        userName: faker.internet.userName(),
        text: faker.random.words(),
        product: product._id
      })
      review.save();
      product.reviews.push(review);
    }

    product.save((err) => {
      if (err) return next(err)
    })
  }
  res.end()
})

//gets products with optional search queries/filters
router.get('/products', (req, res, next) => {
  const itemsPerPage = 9;
  const page = req.query.page || 1;
  const category = req.query.category;
  const name = req.query.query;
  let priceSort = "";
  //adding sorting query
  if (req.query.price === 'highest') {
    priceSort = "-price"
  } else if (req.query.price === "lowest") {
    priceSort = "price"
  }

  let query;
  if (category && name) {
    query = { category: category, name: { "$regex": name, "$options": "i" } }
  } else if (category && !name) {
    query = { category: category };
  } else if (!category && name) {
    query = { name: { "$regex": name, "$options": "i" } }
  } else {
    query = {}
  }

  Product.find(query)
    .sort(priceSort)
    .populate('reviews')
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .exec((err, products) => {
      Product.find(query)
        .count()
        .exec((err, count) => {
          res.send({ products, count });
        })
    })
});

//gets a product with the supplied product id
router.get('/products/:product', (req, res, next) => {
  Product.find({ _id: req.params.product })
    .populate('reviews')
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.send(products);
      })
    })
})

//gets reviews from a product (required product id)
router.get('/products/:product/reviews', (req, res, next) => {
  const itemsPerPage = 4;
  const page = req.query.page || 1;
  Product.find({ _id: req.params.product })
    .populate('reviews')
    .exec((err, products) => {
      if (err) return next(err)
      let startIndex = (page - 1) * itemsPerPage;
      let endIndex = page * itemsPerPage;
      let reviews = products[0].reviews.slice(startIndex, endIndex);
      res.send(reviews);
    })
})

//adds a product to the database
router.post('/products', (req, res, next) => {
  let product = new Product();

  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = req.body.image;

  product.save((err) => {
    if (err) return next(err)
  })

  res.send(product);
})

//adds a review to a product in the database
router.post('/products/:product/reviews', (req, res, next) => {
  let review = new Review();
  review.userName = req.body.userName;
  review.text = req.body.text;
  review.product = req.params.product;

  Product.findOne({ _id: review.product })
    .exec((err, product) => {
      if (err) return next(err)
      review.save((err) => {
        if (err) return next(err)
      })
      product.reviews.push(review);
      product.save((err) => {
        if (err) return next(err)
      })
      res.send(review);
    })
})
//deletes a product from the database
router.delete('/products/:product', (req, res, next) => {
  Product.remove({ _id: req.params.product }, err => {
    if (err) return next(err);

    res.end();
  })
})

//deletes a review from the database
router.delete('/reviews/:review', (req, res, next) => {
  Review.remove({ _id: req.params.review }, err => {
    if (err) return next(err);

    res.end();
  })
})


module.exports = router
