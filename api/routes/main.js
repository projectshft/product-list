const router = require("express").Router();
const faker = require("faker");
const path = require("path");
const Product = require("../models/product");
const Review = require("../models/reviews");

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
const createRegExp = (string) => {
  const splitString = string.split("_");
  const regExp = new RegExp(splitString.join("|"), "i");
  return regExp;
}
// /GET List of Products. Can include search parameters. Response limited to 9 products per page.
router.get("/products", async (req, res) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const { name, price, category, query }  = req.query;
  const sortByPrice = {};
  const pathParameters = {};
  // transform user input into RegExp for search flexibility
  if (name) {
    pathParameters.name = createRegExp(name);
  }
  // Hard coded categories
  if (category) {
    pathParameters.category = category;
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
      category: createRegExp(query)
    };
    const queryPathName = {
      name: createRegExp(query)
    };
    try {
      const total = await Product.countDocuments({$or: [queryPathCategory, queryPathName]});
      const products = await Product
        .find({$or: [queryPathCategory, queryPathName]})
        .sort(sortByPrice)
        .skip(perPage * page - perPage)
        .limit(perPage);   
      res.status(200)
        .json({
          totalPages: (total / perPage), 
          items: products})
        .end();
    } catch {
      res.status(404).end();
    } 
  } else {
    try {
      const total = await Product.countDocuments(pathParameters)
      const products = await Product
        .find(pathParameters)
        .sort(sortByPrice)
        .skip(perPage * page - perPage)
        .limit(perPage);   
      res.status(200)
        .json({
          totalPages: Math.ceil(total / perPage),
          items: products
        })
        .end();
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
  const { productId } = req.params;
  try {
    const product = await Product.find({ _id: productId});
    res.status(200).json(product).end(); 
  } catch {
    res.status(404).end();
  }
  
});

// /DELETE Delete a product by id
router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findByIdAndDelete(productId);
    res.status(200).json(product).end(); 
  } catch {
    res.status(404).end();
  }
});

// /GET Access reviews for a specific product. CURRENTLY RETURNS ARRAY OF ALL REVIEWS. FIGURING OUT PAGINATION.
router.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const perPage = 4;
  const page = req.query.page || 1;

  try {
    const reviews = await Product
      .findById(productId, {'reviews': 1})
      .populate('reviews')
      // .slice((perPage * page - perPage), perPage)
    res.status(200).json(reviews.reviews).end();
        
  } catch {
    res.status(404).end();
  }
})

// /POST Create review for a specific product.
router.post("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;

  const newReview = await new Reviews({
    userName: req.body.userName,
    text: req.body.text,
    product: productId
  });
  newReview.save();

  try { 
    const productToAddReview = await Product.findById(productId)
    productToAddReview.reviews.push(newReview);
    productToAddReview.save();
    res.status(200).json(newReview).end();
  } catch (e) {
    console.log(e.message)
    res.status(404).end();
  }
});

// /DELETE Delete a review by id.
router.delete("/reviews/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  
  try {
    const reviewDeleted = await Review.findByIdAndDelete(reviewId);
    res.status(200).json(reviewDeleted).end(); 
  } catch {
    res.status(404).end();
  }
})
module.exports = router;