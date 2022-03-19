const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product.js");
const Review = require("../models/review.js");

router.param('product', (req, res, next, id) => {
  let retrievedProduct;

  Product.findById(id, (err, product) => {
    if (err) console.error(err);
    retrievedProduct = product;

    if (retrievedProduct) {
      req.product = retrievedProduct;
      next();
    } else {
      res.writeHead(404, 'Product not found.')
      return res.send();
    }
  }).populate('reviews');
  
});

router.param('review', (req, res, next, id) => {
  let retrievedReview;

  Review.findById(id, (err, review) => {
    if (err) console.error(err);
    retrievedReview = review;

    if (retrievedReview) {
      req.review = retrievedReview;
      next();
    } else {
      res.writeHead(404, 'Review not found.')
      return res.send();
    }
  }).populate('product');
  
});

router.get("/generate-fake-data", (req, res, next) => {
  Product.deleteMany({}).exec().then(() => {

    for (let i = 0; i < 90; i++) {
      let product = new Product();
  
      product.category = faker.commerce.department();
      product.name = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.image = "https://via.placeholder.com/250?text=Product+Image";
      product.reviews = [];
  
      product.save((err) => {
        if (err) throw err;
      });
    }
    res.end();

  })
  
});

router.get("/products", (req, res, next) => {
  const pageNumber = req.query['page'] || '1';

  const numToSkip = (parseInt(pageNumber) - 1) * 9;

  Product.find((error, products) => {
    Product.count((err, count) => {
      res.send(products);
    });
  }).skip(numToSkip).limit(9);
});

router.get("/products/:product", (req, res) => {
  res.send(req.product);
});

router.get("/products/:product/reviews", (req, res) => {
  res.send(req.product.reviews);
});

router.post("/products", (req, res) => {
  const productDoc = new Product(req.body);

  productDoc.save((err, product) => {
    if (err) throw err;
    res.send(product);
  })
});

router.post("/products/:product/reviews", (req, res) => {
  req.body.product = req.params.product;
  const newReviewDoc = new Review(req.body);

  req.product.reviews.push(newReviewDoc);

  req.product.save((err, product) => {
    newReviewDoc.save((err, review) => {
      res.send(review);
    });
  });

});

router.delete("/products/:product", (req, res) => {
  Product.findByIdAndDelete(req.product._id, (err, product) => {
    if (err) throw err;
    res.send(product);
  })
});

router.delete("/reviews/:review", (req, res) => {
  Review.findByIdAndDelete(req.review._id, (err, review) => {
    if (err) throw err;
    const revId = review._id;
    Product.findByIdAndUpdate(review.product, {$pull: {reviews: review._id}}).exec().then(() => {
      res.send(review);
    });
  })
});

module.exports = router;