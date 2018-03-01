const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product').Product;
const Review = require('../models/product').Review;

router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
        reviews: []
    })

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
});

router.get('/products', (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let amountToSkip = (page - 1) * 10;
    var query = {};
    if (req.query.category) {
        query.category = req.query.category;
    }
    var sort = {};
    if (req.query.price) {
        if (req.query.price == 'highest') {
            sort.price = 'desc';
        } else {
            sort.price = 'asc';
        }
    }
    Product.find(query).skip(amountToSkip).limit(10).sort(sort).exec((err, products) => {
        if (err) throw err;
        res.send(products);
    })
});

router.get('/products/:product', (req, res, next) => {
    Product.findById(req.params.product, (err, product) => {
        if (err) throw err;
        res.send(product);
    })
});

router.get('/reviews', (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let amountToSkip = (page - 1) * 40;
    Review.find().skip(amountToSkip).limit(40).exec((err, reviews) => {
        if (err) throw err;
        res.send(reviews);
    })
});

router.post('/products', (req, res, next) => {
    let product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png',
        reviews: []
    })
    product.save((err, product) => {
        if (err) throw err;
        res.send(product);
    })
});

router.post('/products/:product/reviews', (req, res, next) => {
    Product.findById(req.params.product, (err, product) => {
        if (err) throw err;
        let review = new Review({
            userName: faker.internet.userName(),
            text: faker.random.words(),
            product: product._id
        })
        review.save();
        product.reviews.push(review);
        product.save();
        res.send(review);
    })
});

router.delete('/products/:product', (req, res, next) => {
    Product.findByIdAndRemove(req.params.product, (err) => {
        if (err) throw err;
    })
    Review.remove({product: req.params.product}, (err) => {
        if (err) throw err;
    })
    res.send();
});

router.delete('/reviews/:review', (req, res, next) => {
    Review.findByIdAndRemove(req.params.review, (err) => {
        if (err) throw err;
        res.send();
    })
});

module.exports = router;