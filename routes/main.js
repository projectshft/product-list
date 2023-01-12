const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const Products = require("../models/products");

// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let products = new Products();

//     products.category = faker.commerce.department();
//     products.name = faker.commerce.productName();
//     products.price = faker.commerce.price();
//     products.image = "https://via.placeholder.com/250?text=Product+Image";

//     products.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

router.get("/myProducts", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  Products.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Products.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
        });
        console.log(products)
    });
});


module.exports = router;