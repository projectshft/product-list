const router = require("express").Router();
const async = require("async");
const faker = require("faker");
const Product = require("../models/product").Product;
const Review = require("../models/review").Review;

router.get("/products", (req, res, next) => {
  const { query } = req.query || "";
  const { category } = req.query || null;
  const { price } = req.query || "";
  const { page } = req.query || 1;
  const resultsPerPage = 9;

  let lookup = Product;
  let countLookup = Product;

  if (query) {
    lookup = lookup.find({ name: new RegExp(query, "i") });
    countLookup = countLookup.find({ name: new RegExp(query, "i") });
  }

  if (category) {
    let formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    lookup = lookup.find({ category: formattedCategory });
    countLookup = countLookup.find({ category: formattedCategory });
  } else {
    lookup = lookup.find({});
    countLookup = countLookup.find({});
  }

  if (price) {
    let sortValue = null;
    if (price === "highest") sortValue = -1;
    if (price === "lowest") sortValue = 1;

    lookup.sort({ price: sortValue });
    countLookup.sort({ price: sortValue });
  }

  lookup
    .skip(resultsPerPage * page - resultsPerPage)
    .limit(resultsPerPage)
    .exec((err, products) => {
      countLookup.countDocuments().exec((err, count) => {
        lookup.distinct("category").exec((err, category) => {
          if (err) return next(err);
          else
            res.send({
              products: products,
              count: count,
              categories: category,
            });
        });
      });
    });
});

router.get("/products/:product", (req, res, next) => {
  const { product } = req.params;

  Product.find({ _id: product }).exec((err, product) => {
    if (err) return next(err);

    res.send(product);
  });
});

router.get("/products/:product/reviews", (req, res, next) => {
  const { product } = req.params;
  const { page } = req.query || 1;
  const resultsPerPage = 4;

  Review.find({ product_id: product })
    .skip(resultsPerPage * page - resultsPerPage)
    .limit(resultsPerPage)
    .exec((err, review) => {
      if (err) return next(err);

      res.send(review);
    });
});

router.post("/products", (req, res, next) => {
  const { category, name, price, image } = req.body;

  const newProduct = new Product({
    name: name,
    category: category,
    price: price,
    image: image,
  });

  newProduct.save((err, product) => {
    // Why return next(err)?
    if (err) return next(err);

    res.send(product);
  });
});

router.post("/products/:product/reviews", (req, res, next) => {
  const { userName, text } = req.body;
  const { product } = req.params;

  const newReview = new Review({
    userName: userName,
    text: text,
    product_id: product,
  });

  newReview.save();

  let newReviewId = newReview._id;
  Product.updateOne({ _id: product }, { $push: { reviews: newReviewId } }).exec(
    (err, data) => {
      if (err) return next(err);

      console.log(data);
    }
  );
  res.send(newReview);
});

router.delete("/products/:product", (req, res, next) => {
  const { product } = req.params;

  Product.remove({ _id: product }).exec((err, product) => {
    if (err) return next(err);

    res.send(product);
  });

  Review.remove({ product_id: product }).exec((err, review) => {
    if (err) return next(err);

    res.send(review);
  });
});

router.delete("/reviews/:review", (req, res, next) => {
  const { review } = req.params;

  Review.remove({ _id: review }).exec((err, review) => {
    if (err) return next(err);

    res.send(review);
  });
});

// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";

//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

module.exports = router;
