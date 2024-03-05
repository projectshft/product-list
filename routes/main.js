const router = require("express").Router();
const { faker } = require('@faker-js/faker')
const Product = require("../models/product");
const Review = require("../models/reviews")
const response = require("express");
const json = require("body-parser");
const cors = require('cors')




// Generate fake data for the database
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    // product.save();
    res.end();
  };

});

router.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server' })
});


// Endpoint to show products using pagination and populating reviews
router.get('/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const categoryFilter = req.query.category ? { category: new RegExp(req.query.category, 'i') } : {};
  let searchFilter = {};
  let sort = {};

  if (req.query.query) {
    searchFilter = {
      $or: [
        { name: { $regex: req.query.query, $options: 'i' } },
        { category: { $regex: req.query.query, $options: 'i' } }
      ]
    };
  }
  const combinedFilter = { ...categoryFilter, ...searchFilter }

  if (req.query.price === 'highest') {
    sort = { price: - 1 };
  } else if (req.query.price === 'lowest') {
    sort = { price: 1 }
  };

  Product.countDocuments(combinedFilter)
    .then(total => {
      const query = Product.find(combinedFilter).limit(limit).skip(skip).sort(sort);

      query
        .populate('reviews')
        .exec()
        .then((products) => {

          if (products) {
            res.json({
              total,
              products
            })
          } else {
            res.status(404).json({ message: 'No Products Found' })
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'Error fetching products', error: err })
        })
    })
});

//Endpoint used to directly get categories for all products in the database
router.get('/categories', (req, res) => {
  Product.distinct("category")
    .then(categories => {
      res.json(categories);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
      res.status(500).send(error);
    })
});
// Endpoint used to directly get the prices for all products in the database
router.get('/prices', (req, res) => {
  Product.distinct("price")
    .then(prices => {
      res.json(prices);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
      res.status(500).send(error);
    })
});

//  Endpoint to return a product by its ID
router.get('/products/:product', (req, res) => {

  Product.findById(req.params.product)
    .then(product => {
      if (!product) {
        return res.status(404).send('Product not found')
      }

      res.json(product)
    })

    .catch(err => {
      res.status(500).send(err.toString())
    });
});
//Endpoint to return reviews by product ID
router.get('/products/:product/reviews', (req, res) => {

  Product.findById(req.params.product)
    .then(product => {
      if (!product) {
        return res.status(404).send('Product not found')
      }

      res.json(product.reviews)
    })
})
//Endpoint to add new products
router.post('/products', async (req, res) => {

  try {
    const newProduct = new Product({
      category: "Hiking",
      name: "Boots",
      price: 64

    })

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }

});
// Endpoint to add a new review to a product 
router.post('/products/:product/reviews', async (req, res) => {

  try {

    const newReview = new Review({
      userName: req.body.userName,
      text: req.body.text,
      product: req.params.product
    })

    const savedReview = await newReview.save();

    res.status(201).json(savedReview)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }

});
// Endpoint to handle deletion of a specific product by ID
router.delete('/products/:product', async (req, res) => {

  try {

    const productToDelete = await Product.findByIdAndDelete(req.params.product);

    if (!productToDelete) {
      return res.status(404).send('Product not found');

    }
    res.status(200).send('Product Deleted')

  } catch (error) {
    res.status(500).send(error.message)
  }

});
// Endpoint to handle deletion of a review by ID
router.delete('/reviews/:review', async (req, res) => {

  try {

    const reviewToDelete = await Review.findByIdAndDelete(req.params.review);

    if (!reviewToDelete) {
      return res.status(404).send('Review not found');
    }
    res.status(200).send('Review Deleted')

  } catch (error) {
    res.status(500).send({ error: error.message })
  }

});

module.exports = router;