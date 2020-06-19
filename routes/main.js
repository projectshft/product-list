const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')

var getRandomNumber = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'


    let numReviews = getRandomNumber(7);
    for(let i = 0; i < numReviews; i++) {
      let review = new Review({
        userName: faker.internet.userName(),
        text: faker.random.words(),
        product: product._id
      })
      review.save();
      product.reviews.push(review);
    }

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})

router.get('/products', (req, res, next) => {
  const itemsPerPage = 9;
  const page = req.query.page || 1;
  const category = req.query.category;
  let priceSort = "";
  if(req.query.price === 'highest') {
    priceSort = "-price"
  } else if (req.query.price === "lowest") {
    priceSort = "price"
  }

  let query;
  if(category) {
    query = Product.find({category: category})
  } else {
    query = Product.find();
  }
  query
    .sort(priceSort)
    .populate('reviews')
    .skip((page - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.send(products);
      })
    })
  });

router.get('/products/:product', (req, res, next) => {
  Product.find({ _id: req.params.product})
    .populate('reviews')
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)
        res.send(products);
      })
    })
})

router.get('/products/:product/reviews', (req, res, next) => {
  const itemsPerPage = 4;
  const page = req.query.page || 1;
  Product.find({_id: req.params.product})
    .populate('reviews')
    .exec((err, products) => {
      if (err) return next(err)
      let startIndex = (page - 1) * itemsPerPage;
      let endIndex = page * itemsPerPage;
      let reviews = products[0].reviews.slice(startIndex, endIndex);
      res.send(reviews);
    })
})

router.post('/products', (req, res, next) => {
  let product = new Product();

  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = req.body.image;

  console.log(product);

  product.save((err) => {
    if (err) throw err
  })

  res.send(product);
})

router.delete('/products/:product', (req, res, next) => {
  Product.remove({ _id: req.params.product}, err => {
    if (err) throw err;

    res.end();
  })
})

router.delete('/reviews/:review', (req, res, next) => {
  Review.remove({ _id: req.params.review}, err => {
    if (err) throw err;

    res.end();
  })
})


module.exports = router
