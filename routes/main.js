const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
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
});

router.param("product", (req, res, next, id) => {
  Product
  .find({_id: id})
  .populate("reviews")
  .exec((err, product) => {
    if (err)
      req.error = '404';
    else
      req.product = product[0];
    next();
  })
})

router.param("review", (req, res, next, id) => {
  Review
  .find({_id: id})
  .exec((err, review) => {
    if (err)
      req.error = '404';
    else
      req.review = review[0];
    next();
  })
})

// GET all products w/ pagination
router.get("/products", (req, res, next) => {
  const pageNum = req.query.page || 1;

  let sortOrder = '';

  if (req.query.price === 'highest')
    sortOrder = 'desc'
  else if (req.query.price === 'lowest')
    sortOrder = 'asc'

  Product
  .find({category: {$regex: new RegExp(req.query.category, 'i')}, name: {$regex: new RegExp(req.query.query, 'i')}})
  .skip(9 * (pageNum - 1))
  .limit(9)
  .sort({price: sortOrder})
  .exec((err, products) => {
    // Change the count!
    Product.count().exec((err, count) => {
      if (err) return next(err);

      res.send(products);
    });
  });
});

// GET single product by id
router.get("/products/:product", (req, res) => {
  if (req.error === '404') {
    res.writeHead(404, 'Product not found')
    return res.end();
  }

  res.writeHead(200, { "Content-Type": "application/json" })
  return res.end(JSON.stringify(req.product));
})

// POST a new product
router.post("/products", (req, res) => {
  const newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })

  newProduct.save((err) => {
    if (err) throw err;
  });

  res.writeHead(200, { "Content-Type": "application/json" })
  return res.end(JSON.stringify(newProduct));
})

// DELETE a product by id
router.delete("/products/:product", (req, res) => {
  if (req.error === '404') {
    res.writeHead(404, 'Product not found')
    return res.end();
  }

  const productToDeleteJSON = JSON.stringify(req.product);

  Product.deleteOne({_id: req.product._id}, (err) => {
    if (err) throw err;
  })

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(productToDeleteJSON);
})

// GET a product's reviews
router.get("/products/:product/reviews", (req, res, next) => {
  if (req.error === '404') {
    res.writeHead(404, 'Product not found')
    return res.end();
  }

  const pageNum = req.query.page || 1;

  Review
  .find({product: req.product._id})
  .skip(4 * (pageNum - 1))
  .limit(4)
  .exec((err, reviews) => {
    Review.count().exec((err, count) => {
      if (err) return next(err);

      res.send(reviews);
    });
  })
})

// POST a new review for a product
router.post("/products/:product/reviews", (req, res) => {
  if (req.error === '404') {
    res.writeHead(404, 'Product not found')
    return res.end();
  }

  const newReview = new Review({
    text: req.body.text,
    username: req.body.username,
    product: req.product.id
  })

  newReview.save();

  req.product.reviews.push(newReview);
  req.product.save();

  res.writeHead(200, { "Content-Type": "application/json" })
  return res.end(JSON.stringify(newReview));
})

// DELETE a review by id
router.delete("/reviews/:review", (req, res) => {
  if (req.error === '404') {
    res.writeHead(404, 'Review not found')
    return res.end();
  }

  const reviewToDelete = req.review;
  const reviewToDeleteJSON = JSON.stringify(reviewToDelete);

  // I don't think this is working?
  Product.updateOne({_id: reviewToDelete.product}, {$pull: {reviews: {_id: reviewToDelete._id}}}, (err) => {
    if (err)
      console.log(err);
  })

  Review.deleteOne({_id: reviewToDelete._id}, (err) => {
    if (err) throw err;
  })

  res.writeHead(200, { "Content-Type": "application/json" })
  return res.end(reviewToDeleteJSON);
})

module.exports = router;