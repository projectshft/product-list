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
    product.reviews = [];

    const result = product.save();
    console.log(result)

    // product.save((err) => {
    //   if (err) throw err;
    // });
  }
  res.end();
});

//New way to fix no longer accepts a callback()
//Gets 9 products per page
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

//Gets Product by ID
router.get("/products/:product", async (req, res, next) => {
  try {
    const prodById = await Product.findById(req.params.product);

    if (!prodById) {
      return res.status(404).send({error: "404 Not Found No Product with that ID"});
    }
    res.send(prodById);
    console.log(prodById);

  } catch (err) {
    console.log (err);
    res.status(500).send({error: "error has occured"});
  }
});

//Get Product Reviews by Product ID
router.get("/products/:product/reviews", async (req, res, next) => {
  try {
    const prodById = await Product.findById(req.params.product);
    if (!prodById) {
      return res.status(404).send({error: "404 Not Found No Product with that ID"});
    }
    //Data for Result Obj
    const pageNumber = parseInt(req.query.page) || 1;
    const reviewNumber = 4;
    const start = (pageNumber - 1) * reviewNumber;
    const end = start + reviewNumber;
    const allReviews = prodById.reviews.slice(start, end);
    //Result  Obj
    const result = {
      page: pageNumber,
      onPage: reviewNumber,
      reviews: allReviews
    }
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: "Error Occured"})
  }
})


module.exports = router;