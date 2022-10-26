const router = require("express").Router();
const { faker } = require('@faker-js/faker');
const {Product} = require("../models/product");
const {Review} = require("../models/product");


// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();
  
//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.reviews = []
//     product.image = "https://via.placeholder.com/250?text=Product+Image";
//     product.save((err) => {
//       if (err) throw err;
//     });
//     for (let x = 0; x < 8; x++) {
//       let review=new Review()

//       review.userName=faker.name.fullName(),
//       review.text=faker.commerce.productDescription()
//       review.product=product._id
//       review.save((err) => {
//         if (err) throw err;
//       });
//       product.rewievs.push(review)
//   res.end();
// }}})

router.param('product', (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) next(err);

    req.product = product;
    next();
  });
});

router.param('review', (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) next(err);

    req.review = review;
    next();
  });
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

router.get("/products/:product", (req, res, next) => {
  if (req.product) {
    res.status(200);
    return res.send(req.product);
    }
    res.status(404);
    return res.send('Error. Product with this id is not found');
})

router.get("/products/:product/reviews", (req, res, next) => {
  const perPage = 4;
  const page = req.query.page || 1;
  if (req.product){
    Review
    .find({product:req.params.product})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, reviews)=> {
      if (err) return next(err);
      return res.send(reviews);
    });
  }
  res.status(404);
    return res.send('Error. Product with this id is not found');
})

router.post("/products", (req, res, next) => {
  if (req.body) {
    let product = new Product;
    product.category = req.body.category;
    product.price = req.body.price;
    product.name = req.body.name;
    product.image = req.body.image;
    product.save();    
  }
  res.end();
})

router.post("/products/:product/reviews", (req, res, next) => {
})

router.post("/products/:product", (req, res, next) => {
})

router.delete("/products/:product", (req, res, next) => {
})

router.delete("/reviews/:review", (req, res, next) => {
})





module.exports = router;