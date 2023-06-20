const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

// Generate fake data for the DB
// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";

//     product.save();
//   }  
//   res.end();
// });

router.get("/products", async (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  // Product.find({})
  //   .skip(perPage * page - perPage)
  //   .limit(perPage)
  //   .exec().then((products) => {
  //     Product.count().exec().then((count) => {
  //       res.send(products);
  //     });
  //   });

  try {
    let products = await Product.find().skip(perPage * page - perPage).limit(perPage).exec();

  res.send(products);
  } catch (err) {
    if (err) return next(err);
  };
   
  // Mongoose Removed Callback Support For Several of their Functions
  // Product.find({})
  //   .skip(perPage * page - perPage)
  //   .limit(perPage)
  //   .exec((err, products) => {
  //     // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
  //     Product.count().exec((err, count) => {
  //       if (err) return next(err);

  //       res.send(products);
  //     });
  //   });

});

module.exports = router;