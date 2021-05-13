const router = require("express").Router();
const faker = require("faker");
const Product = require ("../models/product");
const Review = require ("../models/product");


router.param('product', function(req, res, next, id) {
  const query = Product.findOne({ _id: id });

  query.exec((err, product) => {
    if (err)
      return next(err);
    if (!product)
      return next(new Error("Can't find Product."));
    
    req.product = product
    next();
  })
})

router.get("/generate-fake-data", (req, res, next) => {
  for( let i = 0; i < 90; i++) {
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

  // return the first page by default
  const page = req.query.page || 1;

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
//return product by id
router.get("/products/:product", (req, res, next) => {
	res.send(req.product)
  next();
})

router.get("/products/:product/reviews", (req, res, next) => {
  const reviewsPerPage = 4;
  const reviews = req.product.reviews;
  const page = req.query.page || 1;

	res.send(reviews)
})

router.post("/products", (req, res, next) => {
  let newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })
  newProduct.save();
  res.send(newProduct);
  next();
})

router.post("/products/:product/reviews", (req, res, next) => {    
  let newReview = {
    userName: req.body.userName,
    text: req.body.text,
  }
  
  req.product.reviews.push(newReview);
  req.product.save();
  res.send(newReview);
})

router.delete("/products/:product", (req, res, next) => {    
  
})

module.exports = router;