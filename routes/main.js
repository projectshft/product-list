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

//GET all products, with optional params like sorting or a specific page
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

//GET specific product by its id, use model.find()
router.get('/products/:product', (req, res, next) => {
  res.end()
})

//GET all reviews (limit to 4 at a time with pagination) for a 
//specific product by its id. Use model.find() and paginate with optional 'page' 
//query param
router.get('/products/:product/reviews', (req, res, next) => {
  res.end()
})

//POST to create a new product in the database, use Model.save()
router.post('/products', (req, res, next) => {
  res.end();
})

//POST to create a new review in the database, maybe first use model.find() to get 
//the product and specific review array, then use push to add to the product's 
//reviews array then maybe use Model.save() to update the product document
router.post('/products', (req, res, next) => {
  res.end();
})

//DELETE a product by id
router.delete('/products/:product', (req, res, next) => {
  //use model.remove() and model.find() maybe
})

//DELETE a review by id
router.delete('/reviews/:review', (req, res, next) => {
  //use model.remove() and model.find() maybe
})

module.exports = router;