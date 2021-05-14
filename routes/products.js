const router = require("express").Router();
const Product = require("../models/product");
const Review = require("../models/review");
const mongoose = require("mongoose");

router.param("product", (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if(err) {
      console.error(err)
    }
    req.product = product;
    next();
  })
})

router.get("/", (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 9;
  //TODO: Convert catgory so it is not case sensitive
  const category = req.query.category || {"$exists": true};
  // If price query is provided, sort the products by price either ascending or descending
  let price = ''
  if(req.query.price === "highest") {
    price = "-price";
  }
  if(req.query.price === "lowest") {
    price = "price";
  }
  // If the search query is provided, search to find products matching query (Expand to include category search if needed)
  const query = req.query.query ? {$regex: req.query.query, $options: "i"} : {"$exists": true};
  const productsPromise = Product.find({category, name: query})
    .sort(price)
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec()
  const countPromise = Product.countDocuments({category, name: query}).exec();
  Promise.all([productsPromise, countPromise]).then((results) => {
    const [products, count] = results;
    res.send({products, count});
  }).catch((e) => {
    console.error(e);
  })
});

router.post("/", (req, res) => {
  const {category, name, price, image } = req.body;
  if(!category || !name || !price) {
    res.status(400).send("Must provide product category, name, and price")
    return;
  }
  const newProduct = new Product();
  newProduct.category = category;
  newProduct.name = name;
  newProduct.price = price;
  newProduct.image =  image || "https://via.placeholder.com/250?text=Product+Image";
  newProduct.reviews = [];

  newProduct.save().then(savedProduct => {
    res.send(savedProduct);
  })
})

router.get("/:product", (req, res, next) => {
  if(!req.product) {
    res.status(404).send("Product Not Found");
    return;
  }
  res.send(req.product);
})

router.delete("/:product", (req, res) => {
  if(!req.product) {
    res.status(404).send("Product Not Found");
    return;
  }
  Product.findByIdAndDelete(req.product._id).exec((err, deletedProduct) => {
    if(err) {
      console.error(err);
    }
    res.send("Product Deleted");
  })
})

router.get("/:product/reviews", (req, res, next) => {
  if(!req.product) {
    res.status(404).send("Product Not Found");
    return;
  }
  const page = req.query.page || 1;
  const perPage = 4;
  const reviewsSkipped = (page-1)*perPage;
  req.product.populate({path: "reviews", perDocumentLimit: perPage, options: {skip: reviewsSkipped}}, () => {
    res.send(req.product.reviews);
  })
})

router.post("/:product/reviews", (req, res) => {
  if(!req.product) {
    res.status(404).send("Product Not Found");
    return;
  }
  const {username, text} = req.body;
  if(!username || !text) {
    res.status(400).send("Must include review text and username");
  }
  const newReview = new Review();
  newReview.username = username;
  newReview.text = text;
  newReview.product = req.product;
  newReview.save()
  req.product.reviews.push(newReview);
  req.product.save()
  res.send("New Review Added");
})

module.exports = router;