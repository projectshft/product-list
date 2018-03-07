const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product').Product;
const Review = require('../models/product').Review;

// create 90 fake products
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: "https://vignette.wikia.nocookie.net/detectiveconan96/images/7/72/Generic_Male_Profile.jpg/revision/latest?cb=20140709000724",
        reviews: []
    })

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
});

// get all products or filter products based on search, category, or page and order by price
router.get('/products', (req, res, next) => {
    // if 'page' is present in query, limit products to 9 per page
    let page = parseInt(req.query.page) || 1;
    let amountToSkip = (page - 1) * 9;
    let limit;
    if (req.query.page) {
        limit = 9;
    }
    // if 'category' is present in query, return products associated with specified category
    var query = {};
    if (req.query.category) {
        query.category = req.query.category;
    }
    // if 'price' is present in query, sort products from either highest to lowest or lowest to highest based on user specification
    var sort = {};
    if (req.query.price) {
        if (req.query.price == 'highest') {
            sort.price = 'desc';
        } else {
            sort.price = 'asc';
        }
    }
    // if 'search' is present in query, return only products that match search query
    const search = req.query.search || "";
    if (search) {
        query.$text = { $search: search };
    }
    Product.find(query).skip(amountToSkip).limit(limit).sort(sort).exec((err, products) => {
        if (err) throw err;
        res.send(products);
    })
});

// get one product using product id
router.get('/products/:product', (req, res, next) => {
    Product.findById(req.params.product).populate('reviews').exec((err, product) => {
        if (err) throw err;
        res.send(product);
    })
});

// get reviews, 40 per page
router.get('/reviews', (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    let amountToSkip = (page - 1) * 40;
    Review.find().skip(amountToSkip).limit(40).exec((err, reviews) => {
        if (err) throw err;
        res.send(reviews);
    })
});

// create a new product with faker data
router.post('/products', (req, res, next) => {
    let product = new Product({
        category: faker.commerce.department(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: "https://vignette.wikia.nocookie.net/detectiveconan96/images/7/72/Generic_Male_Profile.jpg/revision/latest?cb=20140709000724",
        reviews: []
    })
    const { body } = res.req;
    if (body.name) {
        product.name = body.name;
    }
    if (body.category) {
        product.category = body.category;
    }
    if (body.price) {
        product.price = body.price;
    }
    product.save((err, product) => {
        if (err) throw err;
        res.send(product);
    })
});

// create a new review with faker data
router.post('/products/:product/reviews', (req, res, next) => {
    Product.findById(req.params.product, (err, product) => {
        if (err) throw err;
        let review = new Review({
            userName: faker.internet.userName(),
            text: faker.random.words(),
            product: product._id
        })
        const { body } = res.req;
        if (body.userName) {
            review.userName = body.userName;
        }
        if (body.text) {
            review.text = body.text;
        }
        review.save();
        // add review to product
        product.reviews.push(review);
        product.save();
        res.send(review);
    })
});

// delete a product and it's associated reviews using product id
router.delete('/products/:product', (req, res, next) => {
    // delete product
    Product.findByIdAndRemove(req.params.product, (err) => {
        if (err) throw err;
    })
    // delete reviews
    Review.remove({product: req.params.product}, (err) => {
        if (err) throw err;
    })
    res.end();
});

// delete a review using review id
router.delete('/reviews/:review', (req, res, next) => {
    Review.findByIdAndRemove(req.params.review, (err) => {
        if (err) throw err;
        res.end();
    })
});

module.exports = router;