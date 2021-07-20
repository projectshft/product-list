const router = require("express").Router();
const faker = require("faker");
const { Product, Review } = require("../models/product");

router.param("product", async function (req, res, next, id) {
  req.product = await Product.findById(id).populate("reviews");

  if (!req.product) {
    res.sendStatus(404);
  }

  next();
});

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

router.get("/products", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  Product.find({})
    .populate("reviews")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.countDocuments().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:product", (req, res) => {
  res.json(req.product);
});

router.get("/products/:product/reviews", (req, res) => {
  const product = req.product;

  const perPage = 4;

  // return the first page by default
  const page = req.query.page || 1;

  Review.find({ product: product._id })
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Review.countDocuments().exec((err, count) => {
        if (err) return next(err);

        res.json(reviews);
      });
    });
});

router.post("/products", (req, res) => {
  const category = req.body.category;
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;

  const product = addProduct(category, name, price, image);
  res.json(product);
});

router.post("/products/:product/reviews", (req, res) => {
  const product = req.product;
  const userName = req.body.userName;
  const text = req.body.text;

  addReview(product, userName, text);

  res.json(product);
});

router.delete("/products/:product", async (req, res) => {
  const deletedProduct = await deleteProduct(req.product._id);

  if (!deletedProduct) {
    return res.sendStatus(404);
  }

  return res.json(deletedProduct);
});

router.delete("/reviews/:review", async (req, res) => {
  const deletedReview = await deleteReview(req.params.review);

  if (!deletedReview) {
    return res.sendStatus(404);
  }

  return res.json(deletedReview);
});

// ***** Helper Functions *****
const deleteReview = async (id) => {
  const deletedReview = await Review.findByIdAndDelete(id);
  return deletedReview;
};

const deleteProduct = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);
  return deletedProduct;
};

const addReview = (product, userName, text) => {
  const review = new Review({
    userName,
    text,
    product: product._id,
  });

  product.reviews.push(review);
  review.save();
  product.save();
};

const addProduct = (category, name, price, image) => {
  const product = new Product({
    category,
    name,
    price,
    image,
    reviews: [],
  });

  product.save();
  return product;
};

module.exports = router;
