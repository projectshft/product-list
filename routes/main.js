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
  const pageNum = req.query.page || 1;
  const amountToSkip = pageNum * 9 - 9;
  const category = req.query.category;
  const query = req.query.query;
  const priceSorting = req.query.sort;
  let priceParam = "";
  
  if (priceSorting == "highest") {
    priceParam = "-price";
   
  } 
  else if (priceSorting == "lowest") {
    priceParam = "price";
  }

  if (category && query) {
   
    Product.find({category: category, "name": {$regex: query}}).skip(amountToSkip).limit(9).sort(priceParam).exec((err, products) => {
      if (err) next(err);
      Product.count({category: category, "name": {$regex: query}}, (err, count) => {
        if (err) next (err);
        res.send({
          products: products,
          pageNum: pageNum,
          numOfDocs: count,
          params: req.query
        });
      })
    })
  };

  if (category && !query) {
  
    Product.find({category: category}).skip(amountToSkip).limit(9).sort(priceParam).exec((err, products) => {
      if (err) next(err);
      Product.count({category: category}, (err, count) => {
        if (err) next (err);
        res.send({
          products: products,
          pageNum: pageNum,
          numOfDocs: count,
          params: req.query
        });
      })
    })
  }

  if (!category && query) {
  
    Product.find({"name": {$regex: query}}).skip(amountToSkip).limit(9).sort(priceParam).exec((err, products) => { 
      if (err) next (err);

      Product.count({"name": {$regex: query}}, (err, count) => {
        if (err) next (err);
        res.send({
          products: products,
          pageNum: pageNum,
          numOfDocs: count,
          params: req.query
        });
      })
    });
  }; 
  
  if (!category && !query) {

    Product.find().skip(amountToSkip).limit(9).sort(priceParam).exec((err, products) => { 
      if (err) next (err);
      Product.count({}, (err, count) => {
        if (err) next (err);
        res.send({
          products: products,
          pageNum: pageNum,
          numOfDocs: count,
          params: req.query
        });
      })
    });
  }

});

router.get("/products/:product", (req, res, next) => {
  const productId = req.params.product;
  Product.findById(productId).exec((err, product) => {
    if (err) next(err);
    res.send(product);
  });
});

router.get("/products/:product/reviews", (req, res, next) => {
  const productId = req.params.product;
  const pageNum = req.query.page || 1;
  const amountToSkip = pageNum * 4 - 4;

  Product.findById(productId).exec((err, product) => {
    if (err) next(err);

    const reviews = product.reviews;
    const reviewsToReturn = reviews.slice(amountToSkip, pageNum * 4);

    res.send({
      reviews: reviewsToReturn,
      pageNum: pageNum
    });
  });
});


router.post("/products", (req, res, next) => {
  if (req.body.category && req.body.name && req.body.price && req.body.image) {
    Product.create({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      reviews: req.body.reviews
    })
  } else {
    next(err);
  }
});

router.post("/products/:product/reviews", (req, res, next) => {
  const productId = req.params.product;

  if (req.body.username && req.body.text) {
    Product.findById(productId).exec((err, product) => {
      const newReview = {
        username: req.body.username,
        text: req.body.text
      };
      product.reviews.push(newReview);
      product.save();
    });
   
  }
  else {
    next(err);
  }
});

router.delete("/products/:product", (req, res, next) => {
  const productId = req.params.product;

  Product.deleteOne({_id: productId}).exec((err, product) => {
    if (err) next(err);
    res.send("product has been removed");
  });
})

router.delete("/reviews/:review", (req, res, next) => {
  const reviewId = req.params.review;

  Product.find({'reviews._id': reviewId}).exec((err, product) => {
    if (err) next(err);
    product[0].reviews.pull(reviewId);
    res.send(product);
  });
});


module.exports = router;