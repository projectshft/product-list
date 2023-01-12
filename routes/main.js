const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const MyProducts = require("../models/myProducts");
const Reviews = require('../models/reviews')

// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let myProducts = new MyProducts();

//     myProducts.category = faker.commerce.department();
//     myProducts.name = faker.commerce.productName();
//     myProducts.price = faker.commerce.price();
//     myProducts.image = "https://via.placeholder.com/250?text=Product+Image";

//     myProducts.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

router.get("/myProducts", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  MyProducts.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, myProducts) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      MyProducts.count().exec((err, count) => {
        if (err) return next(err);

        res.send(myProducts);
        });
        console.log(myProducts)
    });
});


module.exports = router;