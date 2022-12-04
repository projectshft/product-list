const express = require('express');
const { getAllProducts, getProduct, getReviewsForProduct, createNewProduct, createNewReviewForProduct, deleteProduct } = require('../controllers/productsController');
const { deleteReview } = require('../controllers/reviewsController')

const router = express.Router();

//GET All Products
router.get('/', getAllProducts)

//GET Specific Product
router.get('/:product', getProduct)

//GET all reviews for specific product
router.get('/:product/reviews', getReviewsForProduct)

//POST a new product
router.post('/', createNewProduct)

//POST a new review to a specific product
router.post('/:product/reviews', createNewReviewForProduct)

//DELETE a product
router.delete('/:product', deleteProduct)

//DELETE a review
router.delete('/reviews/:review', deleteReview)


module.exports = router;