const router = require("express").Router();
const Product = require("../models/products");
const Review = require("../models/reviews");

// GET all products (nine per page)
router.get("/", (req, res, next) => {
  const perPage = 9;
  const { page } = req.query || 1;
  const { category, query, price } = req.query;

  const sortBy = {
    Highest: { price: -1 },
    Lowest: { price: 1 }
  }

  const filter1 = {
    ...category ? { category: { '$regex': `^${category}$`, '$options': 'i' } } : {},
    ...query ? { name: { '$regex': query, '$options': 'i' } } : {}
  };
  
  const filter2 = {
    ...query ? { name: { '$regex': query, '$options': 'i' } } : {}
  };

  Product.find(filter1)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(sortBy[price] || {})
    .exec(async (err, products) => {
      if (err) return next(err);
      const count = await Product.countDocuments(filter1);
      const categories = await Product.distinct('category', filter2);
      return products ? res.send({count, categories, products}) : res.status(404).end()
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

      Product.findById(req.params.productId)
        .exec((err, product) => {
          if (err) return next(err);
          return product ? res.send(review) : res.status(404).end()
        });
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

// DELETE a given product by ID
router.delete("/:productId", (req, res, next) => {
  Product.findByIdAndDelete(req.params.productId)
  .exec((err, product) => {
    if (err) return next(err);

    if (product) {
      Review.deleteMany({ product: req.params.productId })
      .exec((err, result) => {
        if (err) return next(err);
        return result ? res.status(204).send() : res.status(404).end()
      })
    } else {
      res.status(404).end()
    }
  });
});

module.exports = router;