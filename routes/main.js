const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

//get products w/ server pagination
router.get('/products', (req, res) => {
  const page = req.query.page || 1
  const perPage = 9
  const skipNum = ((page * perPage) - perPage);
  
  Product.find({}).skip(skipNum).limit(9).exec(function (err, products) {
    if (err) return console.log(err);
    res.send(products)
  });

});

module.exports = router;


/*****************************Testing*****************************

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


*/
