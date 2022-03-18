const router = require("express").Router();
const faker = require("faker");
const Review  = require("../models/review");
const Product = require("../models/product");

const PRODUCTS_PER_PAGE = 9;
const REVIEWS_PER_PAGE =4;


// PARAMS 
router.param('product', function(req, res, next, id) {
  // check if valid id
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    Product.findById(id, function (err, product) {
      if (err) throw err;
      req.product = product;
      next()
    })
  } else {
    res.writeHead(400, "Invalid Product Id");
    res.send();
  } 
});

// GENERATE DATA
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    let review = new Review();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = []

    review.userName = faker.internet.userName();
    review.text = faker.lorem.sentence();
    review.product = product._id;

    review.save((err) => {
      if (err) throw err;
    });

    product.reviews.push(review);

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

const getNumOfProductsToSkip = function(pageNumber) {
  return PRODUCTS_PER_PAGE * (pageNumber - 1)
}

// GET PRODUCTS
router.get("/products", (req, res, next) => {
  let pageNum = req.query.page;
  if (!pageNum) {
    pageNum = 1;
  }

  const numOfProductsToSkip = getNumOfProductsToSkip(pageNum);

  Product.find({})
    .skip(numOfProductsToSkip)
    .limit(PRODUCTS_PER_PAGE)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);
        // else if (products.length === 0) {
        //   res.writeHead(404, "Page does not exist");
        //   res.send()
        // }
        res.send(products);
      });
    });
});

// GET PRODUCT
router.get("/products/:product", (req, res, next) => {
  if (!req.product) {
    res.writeHead(404, "Product does not exist")
    res.send()
  } else {
    res.send(req.product);
  }
  
})

// GET REVIEWS 
router.get("/products/:product/reviews", (req, res, next) => {
  
  if (!req.product) {
    res.writeHead(404, "Product does not exist")
    res.end();
  } else {

    const id = req.params.product
    const page = req.query.page || 1;

    Product.findById(id)
      .populate({
        path: 'reviews',
        perDocumentLimit: REVIEWS_PER_PAGE,
        skip: REVIEWS_PER_PAGE * (page - 1)
      })
      .exec((err, product) => {
        if (err) throw err;
        res.send(product.reviews)
      })
    }
})

// POST PRODUCT
router.post("/products", (req, res, next) => {
  
  let newProduct = new Product();
  product.category = "test cat";
  product.name = "test name";
  product.price = 100
  product.image = "http://www.test.come";
  product.reviews = []

  product.save((err) => {
    if (err) throw err;
  });
})

module.exports = router;


