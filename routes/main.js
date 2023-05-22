const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

//generates 90 random products in the products DB, no need to run again
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    // product.save((err) => {
    //   if (err) throw err;
    // });
    product.save()
      .then((result) => {console.log('Result: ', result)})
      .catch((e) => {console.log(e)});
  }
  res.end();
});

//gets all products, with optional params like sorting or a specific page
router.get('/products', (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;
  console.log(req.query);
  
  Product.find({})
    .skip(perPage*page - perPage)
    .limit(perPage)
    .then((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      if (err) return next(err);
      Product.count()
      })
    .then((products) => {
      res.send(products);
      

    })
    .catch((err) => {if (err) console.log(err)})
})

module.exports = router;