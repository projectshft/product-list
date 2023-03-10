const router = require("express").Router();
const faker = require("faker");
const path = require("path");
const Product = require("../models/product");
const Reviews = require("../models/reviews");

// Populate Product Database with "dummy data"
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save();
  }
  res.end();
});

const createRegExp = (string) => {
  const splitString = string.split("_");
  const regExp = new RegExp(splitString.join("|"), "i");
  return regExp;
}
// /GET list of 9 products per page 
router.get("/products", async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const { name, price, category, query }  = req.query;
  const sortByPrice = {};
  const pathParameters = {}

  if (name) {
    pathParameters.name = createRegExp(name);
  }
  
  if (price) {
    if (price === "lowest"){
      sortByPrice.price = 1;
    } else {
      sortByPrice.price = -1;
    }
  };
  
  if (category) {
    pathParameters.category = createRegExp(category);
  }
  
  if (query) {
    pathParameters.category = createRegExp(query);
    pathParameters.name = createRegExp(query);
  }

  try {
    const products = await Product.find(pathParameters)
          .sort(sortByPrice)
          .skip(perPage * page - perPage)
          // .limit(perPage)
          // .exec();
          
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products));
  } catch (e) {
    console.log(e.message);
  }
  next();
});


module.exports = router;