const router = require("express").Router();
const Product = require("../models/product");
const Review = require("../models/review");

// Query parameter function to return product given a product id in the path
router.param("product", (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      next(err)
    } else if (product) {
      req.product = product;
      next()
    } else {
      next(new Error('failed to load product'))
    }
  });
});

// GET /products Returns products based on input criteria
router.get("/products", (req, res, next) => {
  const perPage = 5;
  const page = req.query.page || 1;
  const {category, query, price} = req.query;

  // Include category and/or search term in product query, if included in request
  const queryOptions = {};
  if (category) {
    queryOptions.category = category;
  };
  if (query) {
    queryOptions.$text = { $search: query }
  };

  // Sort found products by price, if included in request
  const sortOption = {};
  switch (price) {
    case 'lowest':
      sortOption.price = 'asc';
      break;
    case 'highest':
      sortOption.price = 'desc';
      break;
    default:
  };

  Product.find(queryOptions).skip((page - 1) * perPage).limit(perPage).sort(sortOption).exec((err, products) => {
      if (err) return next(err);
      res.send(products);
    });
  });

// GET /products/:product: Returns a specific product by its id
router.get("/products/:product", (req, res, next) => {
  res.send(req.product);
});

// GET /products/:product/reviews: Returns all the reviews for a product, limited to 4 per page with an optional page query parameter
router.get("/products/:product/reviews", (req, res, next) => {
  const perPage = 4;
  const page = req.query.page || 1
  Product.findById(req.product._id, 'reviews').populate({
      path: 'reviews',
      perDocumentLimit: perPage,
      options: {skip: (page - 1) * perPage}
    })
  .exec((err, product) => {
    if (err) {next(err)}
    res.send(product.reviews);
  });
});

// POST /products: Creates a new product in the database
router.post("/products", (req, res, next) => {
  let product = new Product();
  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = req.body.image;
  product.reviews = [];

  product.save((err) => {
      if (err) throw err;
  });
  res.send(product);
});

// POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array
router.post("/products/:product/reviews", (req, res, next) => {
  let review = new Review();

  review.userName = req.body.userName;
  review.text = req.body.text;
  review.product = req.product._id;

  review.save((err) => {
      if (err) throw err;
  });

  Product.findByIdAndUpdate(
    req.product._id,
    { $push: { reviews: review }},
    { new: true },
    (err, product) => {
      if (err) throw err;
  });
  res.send(review);
});

// DELETE /products/:product: Deletes a product by id
router.delete("/products/:product", (req, res, next) => {
  // delete all reviews for the product by its ID, and then the product
  Product.findByIdAndDelete(req.product._id, (err, product) => {
    if (err) throw err;
    product.reviews.forEach(reviewId => {
      Review.findByIdAndDelete(reviewId, (err, review) => {
        if (err) throw err;
      });
    });
    res.send(product);
  });
});

module.exports = router;