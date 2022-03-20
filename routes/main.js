const router = require("express").Router();
const { exec } = require("child_process");
const faker = require("faker");
const Product = require("../models/product");

//router.get("/generate-fake-data", (req, res, next) => {
  //for (let i = 0; i < 90; i++) {
    //let product = new Product();

    //product.category = faker.commerce.department();
    //product.name = faker.commerce.productName();
    //product.price = faker.commerce.price();
    //product.image = "https://via.placeholder.com/250?text=Product+Image";

    //product.save((err) => {
      //if (err) throw err;
    //});
  //}
  //res.end();
//}); 

router.get("/products", (req, res, next) => {
  const productsPerPage = 9;

  const defaultPage = req.query.page || 1;

  Product.find({})
    .skip(productsPerPage * defaultPage - productsPerPage)
    .limit(productsPerPage)
    .exec((err, products) => {

      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

module.exports = router;