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

    const result = product.save();
    console.log(result)

    // product.save((err) => {
    //   if (err) throw err;
    // });
  }
  res.end();
});

//New way to fix no longer accepts a callback()
router.get("/products",async (req, res, next) => {
  try {
    //Default val for page and result per page
    const page = parseInt(req.query.page) || 1;
    const resultsPerPage = 9;

    //Skip and limit opt for pagination the results
    const options = {
      skip: (page -1) * resultsPerPage,
      limit: resultsPerPage
    };

    const products = await Product.find({}, null, options);
    const totalResults = await Product.countDocuments();

    //Response Obj with pagination details
    const response = {
      total: totalResults,
      page: page,
      resultsPerPage: resultsPerPage,
      totalPages: Math.ceil(totalResults / resultsPerPage),
      data: products
    };
    res.send(response);
    console.log(response);

  } catch (err) {
    console.log(err);
    res.status(500).send({error: "An unable to GET data"})
  }
});


module.exports = router;