const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
var queryString = require('querystring');
const url = require('url');

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    for (let i =0; i<6; i++){
      product.reviews.push({
        username: faker.internet.userName(),
        text: faker.lorem.sentence()
      })
    }

    product.save((err) => {
      if (err) throw err;
    });
  }
  // Product.find({reviews: {$exists: false}}).deleteMany().exec((err, res)=>{
  //   console.log(res);
  // })
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
      Product.countDocuments().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:product", (req, res)=> {
  Product.find({_id: req.params.product})
    .exec((err, foundProduct)=>{
      if (err) {
        return res.send(err)
      }
      res.send(foundProduct)
  })
  
})


router.get("/products/:product/reviews", (req, res) => {
  const entries = (req.query.page - 1) * 4 || 0;
  Product.find({_id: req.params.product})
    .exec((err, foundProduct) => {
      if (err) {
        return res.send(err)
      }
      const reviewsPage = [];
      for (let i = entries; i < entries + 4; i++){
        if(!foundProduct[0].reviews[i]) {
          continue
        }
        reviewsPage.push(foundProduct[0].reviews[i])
      }
      if (reviewsPage.length === 0){
        return res.send ("404 not found: No reviews on page specified in query, try another page.")
      }
      res.send(reviewsPage)
    })
})

router.post("/products", (req, res) => {
  let newProduct = new Product();
  newProduct.category = req.body.category,
  newProduct.image = req.body.image,
  newProduct.name = req.body.name,
  newProduct.price = req.body.price,
  newProduct.reviews = req.body.reviews,
  
  newProduct.save((err) => {
    if (err) {
      return res.send(err);
    }
  }).exec((err, res) => {
    res.send(`Successfully saved ${newProduct.name} to Database`)
  });
})

router.post("/products/:product/reviews", (req, res) => {
  let review = new Review();
  
})

module.exports = router;