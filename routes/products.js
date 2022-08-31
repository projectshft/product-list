const router = require("express").Router();
const Product = require("../models/products");
const Review = require("../models/reviews");

// GET all products (nine per page)
router.get("/", (req, res, next) => {
  const perPage = 9;
  const { page } = req.query || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

// POST new product
router.post("/", (req, res, next) => {
  const product = new Product(
    {
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: "https://via.placeholder.com/250?text=Product+Image",
      reviews: []
    }
  );

  product.save((err) => {
    if (err) return next(err);
  });

  res.send(product);
});

// GET a given product by ID
router.get("/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .exec((err, product) => {
      if (err) return next(err);
      return product ? res.send(product) : res.status(404).end()
    });
});

// GET reviews for a given product by ID (four per page)
router.get("/:productId/reviews", (req, res, next) => {
  const perPage = 4;
  const { page } = req.query || 1;
  
  Review.find({ product: req.params.productId })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, review) => {
      if (err) return next(err);
      return review && review.length > 0 ? res.send(review) : res.status(404).end()
    });
});

// POST review for a given product by ID
router.post("/:productId/reviews", (req, res, next) => {
  const review = new Review(
    {
      userName: req.body.userName,
      text: req.body.text,
      product: req.params.productId
    }
  );

  Product.findById(req.params.productId)
    .exec((err, product) => {
      if (err) return next(err);

      if (product) {
        review.save((err) => {
          if (err) return next(err);
        });

        product.reviews.push(review)
        product.save()

        res.send(product)
      } else {
        res.status(404).end()
      }
    });
});

module.exports = router;