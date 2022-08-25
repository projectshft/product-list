const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const query = req.query.query;
  const category = req.query.category;
  const sort = req.query.sort == 'highest' ? {price: -1} : {price: 1};

  if(!query && !category || query === undefined) {
    Product.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort(sort)
        .exec((err, products) => {
          Product.count().exec((err, count) => {
            if (err) return next(err);

            res.send(products);
          });
        });
  } else if (!category) {
    Product.find({name: { "$regex": query, "$options": "i" }})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(sort)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
  } else if (!query) {
    Product.find({category: { "$regex": category, "$options": "i" }})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(sort)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
  } else {
    Product.find({name: { "$regex": query, "$options": "i" }, category: { "$regex": category, "$options": "i" }})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort(sort)
      .exec((err, products) => {
        Product.count().exec((err, count) => {
          if (err) return next(err);

          res.send(products);
        });
      });
  }
});

router.get("/products/:product", (req, res, next) => {
  Product.findByID({req})
  .exec((err, product) => {
    Product.count().exec((err, count) => {
      if (err) return next(err);

      res.send(product);
    });
  });
});

router.get("/products/:product/reviews", (req, res, next) => {
  Product.findByID({req})
    .populate("reviews")
    .exec((err, reviews) => {
      console.log(reviews);
      res.send(reviews);
    });
});

router.post("/products", (req, res, next) => {
  Product.find({})
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.post("/products/:product/reviews", (req, res, next) => {
  Product.findByID({req})
  .populate("reviews")
  .exec((err, reviews) => {
    console.log(reviews);
    res.send(reviews);
  });
});

router.delete("/products/:product", (req, res, next) => {
  Product.findByID({req})
  .exec((err, product) => {
    Product.count().exec((err, count) => {
      if (err) return next(err);

      res.send(product);
    });
  });
});

router.delete("/reviews/:reviews", (req, res, next) => {
  const reviewId = req._id.reviews
  Product.findByID({reviewId})
  .exec((err, product) => {
    Product.count().exec((err, count) => {
      if (err) return next(err);

      res.send(product);
    });
  });
});

module.exports = router;