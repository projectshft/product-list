const express = require('express');
const {
  getAllProducts,
  getProduct,
  getReviewsForProduct,
  createNewProduct,
  createNewReviewForProduct,
  deleteProduct,
  createRandomData,
  getAllCategories,
} = require('../controllers/productsController');

const router = express.Router();

// GET random data
router.get('/get-random-data', createRandomData);

// GET All Products
router.get('/', getAllProducts);

// GET All Categories
router.get('/categories', getAllCategories);

// GET Specific Product
router.get('/:product', getProduct);

// GET all reviews for specific product
router.get('/:product/reviews', getReviewsForProduct);

// POST a new product
router.post('/', createNewProduct);

// POST a new review to a specific product
router.post('/:product/reviews', createNewReviewForProduct);

// DELETE a product
router.delete('/:product', deleteProduct);

module.exports = router;
