const router = require("express").Router();
const mongoose = require("mongoose");
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
// const { query } = require("express");
// const { json } = require("body-parser");

mongoose.set("strictQuery", false);

// Generating product data and reviews:
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    // Create new product
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = faker.image.image();
    product.reviews = [];

    for (let j = 0; j < 5; j++) {
      product.reviews.push({
        username: faker.internet.userName(),
        text: faker.lorem.words(10),
      });

      product.reviews.save((err) => {
        if (err) throw err;
      });
    }
    res.end("Connected");
  }
});

// Filter results by category, name and sort by price
router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const { query, price, category } = req.query;
  const sortPrice = "";
  const results = {};

  if (req.query.price === "highest") sortPrice = "desc";
  else if (req.query.price === "lowest") sortPrice = "asc";

  if (category) {
    results.category = new RegExp(category, "i");
  }

  if (query) {
    results.name = new RegExp(query, "i");
  }

  Product.find(results)
    .sort({ price: sortPrice })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments(results).exec((err, count) => {
        if (err) return next(err);
        res.send({ count, products });
      });
    });
});

// Get a product by id
router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.send("getting product:" + product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: true, message: "Internal Server Error" });
  }
});

// Returns all reviews for a product, but limited to 4 at a time.
router.get("/products/:product/reviews", (req, res) => {
  const productId = req.params.product;
  const page = req.query.page || 1;
  const perPage = 4;
  const skip = page * perPage - perPage;

  Review.find({ product: productId })
    .skip(skip)
    .limit(perPage)
    .exec(function (err, review) {
      if (err) {
        return err;
      } else {
        res.send(review);
      }
    });

  // Product.findById(id).populate({
  //   path: 'reviews', // populate reviews in product
  //   perDocumentLimit: perPage, // Limit to 4 per page
  //   skip: perPage * (page - 1)
  // })
  // .exec((err, review) => {
  //   if (err) throw err;
  //   res.send('returning reviews ' + review);
  //   console.log('sending review' + review)
  // })
});

// Create a new product in the database
router.post("/products", async (req, res) => {
  const data = new ProductSchema({
    query: req.body.query,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
  });
  try {
    const newProduct = await data.save();
    res.status(200).json("new product created:" + newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new review by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", async (req, res) => {
  const data = new ReviewSchema({
    username: faker.internet.userName(),
    text: faker.lorem.words(10),
  });
  try {
    const newReview = await data.save();
    res.status(200).json("new review created:" + newReview);
    product.reviews.push(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  product.save((err) => {
    if (err) throw err;
  });
  res.send(product.reviews);
});

// Delete a product by its id
router.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    res.send("deleting product: " + deleteProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete the review field by product id
router.delete("/products/:id/reviews", async (req, res) => {
  const productId = req.params.id;
  try {
    const findProduct = await Product.findById(productId);
    console.log(findProduct);
    const deleteReview = await findProduct.update(
      { id: req.params.productID },
      console.log(id),
      { $unset: { reviews: "" } }
    );
    res.send("deleting review: " + deleteReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
