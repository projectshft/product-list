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

// GET PRODUCTS
router.get("/products", (req, res, next) => {
  const category = req.query.category;
  const priceSort = req.query.price;
  const querySearch = req.query.query;
  let pageNum = req.query.page;
  
  if (!pageNum) {
    pageNum = 1;
  }

  let query;
  if (category) {
    query = Product.find({ "category": category });
  } else {
    query = Product.find({});
  }

  if (querySearch) {
    query = query.find({ name : new RegExp(querySearch, "i") })
  }

  if (priceSort == "highest") {
    query = query.sort({ "price": -1})
  } else if (priceSort == "lowest") {
    query = query.sort({ "price": 1})
  }

  query.skip(PRODUCTS_PER_PAGE * (pageNum - 1))
  .limit(PRODUCTS_PER_PAGE)
  .exec((err, products) => {
    Product.count().exec((err, count) => {
      if (err) return next(err);
      console.log(`COUNT = ${count}`);
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
  
  let newProduct = new Product({
    category: req.body.category || null,
    name: req.body.name || null,
    price: req.body.price || null,
    image: req.body.image || null,
    reviews: []
  });
  
 
  // is this the best place to handle this?
  if (newProduct.name == null) {
    res.writeHead(400, "Need at least name");
    res.send();
  } else {
    newProduct.save((err) => {
    if (err) throw err;
    else {
      res.send(newProduct);
      }
    });
  }
  

  
})

// POST REVIEW
router.post("/products/:product/reviews", (req, res, next) => {
  const product = req.product;

  if (!req.product) {
    res.writeHead(404, "Product does not exist")
    res.end();
  } else {

    let newReview = new Review({
      text: req.body.text || null,
      userName: req.body.userName || null,
      product: product._id
    });

    if (newReview.userName == null || newReview.text == null) {
      res.writeHead(400, "Missing data for review");
      res.end();
    } else {
      newReview.save((err) => {
        if (err) throw err;
      });

      product.reviews.push(newReview);

      product.save((err) => {
        if (err) throw err;
      });

      res.send(newReview);
    }
  }
});

router.delete("/products/:product", (req, res, next) => {
  const product = req.product;

  if (!req.product) {
    res.writeHead(404, "Product does not exist")
    res.end();
  } else {
    Product.findByIdAndRemove(product._id, (err, product) => {
      if (err) throw err;
      res.send(product);
    })
  }
});

router.delete("/reviews/:review", (req, res, next) => {
  const reviewId = req.params.review;
  if (!reviewId.match(/^[0-9a-fA-F]{24}$/)) {
    res.writeHead(400, "Invalid Review Id");
    res.end()
  } else {
    Review.findByIdAndRemove(reviewId, (err, review) => {
      if (err) throw err;
      if (!review) {
        res.writeHead(404, "Review does not exist");
        res.end();
      } else {
        res.send(review);
      }  
    })
  } 
});

module.exports = router;


