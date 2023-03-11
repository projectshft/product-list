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

// Helper function to create RegExp from user queries to allow more flexibility with searches.
const createRegEx = (string) => {
  const splitString = string.split("_");
  const regExp = new RegExp(splitString.join("|"), "i");
  return regExp;
}
// /GET List of Products. Can include search parameters. Response limited to 9 products per page.
router.get("/products", async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const { name, price, category, query }  = req.query;
  const sortByPrice = {};
  const pathParameters = {};
  
  if (name) {
    pathParameters.name = createRegEx(name);
  }
  
  if (category) {
    pathParameters.category = createRegEx(category);
  }
  
  if (price) {
    if (price === "lowest"){
      sortByPrice.price = 1;
    } else {
      sortByPrice.price = -1;
    }
  };

  // Logic for if query keyword exists, perform search only with keyword. Otherwise, use pathParameters.
  if (query) {
    const queryPathCategory = {
      category: createRegEx(query)
    };
    const queryPathName = {
      name: createRegEx(query)
    };
    try {
      const products = await Product
        .find({$or: [queryPathCategory, queryPathName]})
        .sort(sortByPrice)
        .skip(perPage * page - perPage)
        .limit(perPage);   
      res.status(200).json(products).end();
    } catch {
      res.status(404).end();
    } 
  } else {
    try {
      const products = await Product
        .find(pathParameters)
        .sort(sortByPrice)
        .skip(perPage * page - perPage)
        .limit(perPage);   
      res.status(200).json(products).end();
    } catch {
      res.status(404).end();
    }  
  }  
});

// /POST Add a product to database.
router.post("/products", async (req, res) => {
  try {
    const newProduct = await Product.create({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    });
    res.status(201).json(newProduct).end();
  } catch {
    res.status(418).end();
  }
  
});

// /GET Access a product by id.
router.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.find({ _id: productId});
    res.status(200).json(product).end(); 
  } catch {
    res.status(404).end();
  }
  
});

// /DELETE Delete a product by id
router.delete("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findByIdAndDelete(productId);
    res.status(200).json(product).end(); 
  } catch {
    res.status(404).end();
  }
});


module.exports = router;