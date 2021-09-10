const router = require("express").Router();
const faker = require("faker");
const { Product, Review } = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews= [];

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const numPerPage = 9;

  const page = req.query.page || 1;

  const sortMethod = {};

  if ( req.query.price === "lowest") {
    sortMethod.price = "asc"
  }

  if ( req.query.price === "highest") {
    sortMethod.price = "desc"
  }
  
  const search = {};

  if(req.query.category) {
    search.category = req.query.category;
  }

  if(req.query.query) {
    search.name = { $regex: req.query.query, $options: 'i' }
  }

  Product.find(search)
    .sort(sortMethod)
    .skip(numPerPage * page - numPerPage)
    .limit(numPerPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.param("product", async function(req, res, next, id) {
  req.product = await Product.findById(id).populate("reviews");

  if(!req.product) {
    res.sendStatus(404)
  }

  next();
})

router.get("/products/:product", (req, res) => {
  res.json(req.product);
});

router.get("/products/:product/reviews", (req, res, next) => {
  const reviewNum = 4;

  const reviewPage = req.query.page||1;

  Review.find({product: product._id})
    .skip(reviewNum * reviewPage - reviewNum)
    .limit(reviewNum)
    .exec((err, count) => {
      if (err) return next(err);

      res.json(reviews);
  });
});

router.post("/products", (req, res) => {
  const { category, name, price, image } = req.body;

  const newProduct = new Product({
    category: category,
    name: name,
    price: price,
    image: image,
    reviews: [],
  })

  newProduct.save()
  res.json(newProduct);
});

router.post("/products/:product/reviews", (req, res) => {
const { user, text } = req.body

const newReview = new Review({
  user: user,
  text: text,
  product: product._id,
})

product.reivews.push(newReview);
product.save();
newReview.save();
res.send(newReview);
});

router.delete("/products/:product", (req, res, next) => {
  Product.findByIdandDelete(req.product._id, function (err) {
    if (err) return next(err);
    
    res.send("Product removed")
  });
});

router.delete("/reviews/:review", (req, res, next) => {
  Review.findByIdandDelete(req.params.review, function (err) {
    if (err) return next(err);
    
    res.send("Review removed")
  });
});

module.exports = router;