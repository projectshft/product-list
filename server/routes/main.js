const router = require("express").Router();
const { faker } = require('@faker-js/faker');
const { Product, Review } = require("../models/product");

router.get("/generate-fake-data", async (req, res, next) => {
  try {
    for (let i = 0; i < 90; i++) {
      let product = new Product();

      product.category = faker.commerce.department();
      product.name = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.image = "https://via.placeholder.com/250?text=Product+Image";

      const reviewCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < reviewCount; j++) {
        let review = new Review({
          userName: faker.internet.userName(),
          text: faker.lorem.paragraph(),
        });

        product.reviews.push(review);
      }

      await product.save();
    }
    res.end();
  } catch (err) {
    next(err);
  }
});

router.get("/products", async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const category = req.query.category;
  const price = req.query.price;
  const searchQuery = req.query.query;

  const query = {};
  if (category) {
    query.category = category;
  }

  if (searchQuery) {
    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { category: { $regex: searchQuery, $options: "i" } },
    ];
  }

  const sort = {};

  if (price === "desc") {
    sort.price = -1;
  } else if (price === "asc") {
    sort.price = 1;
  }

  try {
    const products = await Product.find(query)
      .sort(sort)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
      
    const count = await Product.countDocuments(query).exec();

    res.send({
      products,
      total: count,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    next(err);
  }
});


router.get("/products/:product/reviews", (req, res) => {
  const perPage = 4;
  const page = req.query.page || 1;

  Product.findById(req.params.product, (err, product) => {
    if (err) return res.status(500).send(err);

    const reviews = product.reviews.slice(perPage * (page - 1), perPage * page);
    res.send(reviews);
  });
});

router.post("/products", (req, res) => {
  const newProduct = new Product(req.body);

  newProduct.save((err, product) => {
    if (err) return res.status(500).send(err);

    res.send(product);
  });
});

router.post("/products/:product/reviews", (req, res) => {
  const newReview = new Review(req.body);
  newReview.product = req.params.product;

  Product.findByIdAndUpdate(
    req.params.product,
    { $push: { reviews: newReview } },
    { new: true },
    (err, product) => {
      if (err) return res.status(500).send(err);
      res.send(newReview);
    }
  );
});

router.delete("/products/:product", (req, res) => {
  Product.findByIdAndDelete(req.params.product, (err) => {

    if (err) return res.status(500).send(err);

    res.send({ message: "Product deleted" });
  });
});

router.delete("/reviews/:review", (req, res) => {
  Product.findOneAndUpdate(
    { "reviews._id": req.params.review },
    { $pull: { reviews: { _id: req.params.review } } },
    (err) => {

      if (err) return res.status(500).send(err);

      res.send({ message: "Review deleted" });
    }
  );
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Error fetching categories");
  }
});

module.exports = router;