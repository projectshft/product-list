const router = require("express").Router();
const { faker } = require('@faker-js/faker')
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
  const queriedPage = Number(req.query.page)
  let pagesToSkip = 0
  const productsPerPage = 9

  if(Number.isInteger(queriedPage) && queriedPage > 0){
    pagesToSkip = (queriedPage * productsPerPage) - productsPerPage
  }

  Product.find().skip(pagesToSkip).limit(productsPerPage).exec((err, products) => {
    if(err) return res.send(err);

    res.send(products)
  });
});

router.param('product', function(req, res, next, id) {
  req.product = Product.findById(id, (err, product) => {
    if(err) return err

    return product
  })
  next();
});

//  GET /products/:product: Returns a specific product by its id
router.get('/products/:product', (req, res, next) => {
  res.send(req.product)
  next()
})

module.exports = router;