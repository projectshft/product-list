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
  const numPerPage = 9;

  const page = req.query.page || 1;
  
  Product.find({})
    .skip(numPerPage * page - numPerPage)
    .limit(numPerPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.param("product", async function(req, res, next, id) {
  req.product = await Product.findById(id)

  if(!req.product) {
    res.sendStatus(404)
  }

  next();
})

router.get("/products/:product", (req, res) => {
  res.json(req.product);
});

router.get("/products/:product/reviews", (req, res, next) => {

});

router.post("/products", (req, res, next) => {

});

router.post("/products/:product/reviews", (req, res, next) => {

});

router.delete("/products/:product", (req, res, next) => {

});

router.delete("/reviews/:review", (req, res, next) => {

});

module.exports = router;