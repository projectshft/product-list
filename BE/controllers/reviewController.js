const Review = require('../models/review');
const Product = require('../models/product');
const mongoose = require('mongoose');

const getAllReviews = async (req, res) => {
  try {
      const reviews = await Review.find(); // Fetch all reviews
      res.json(reviews); // Return the reviews
  } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

const createReview = async (req, res) => {
  try {
      // Extract data from request body
      const { user, rating, review, productId } = req.body;

      // Create a new review instance
      const newReview = new Review({
          user,
          rating,
          review,
          productId
      });

      // Save the review to the database
      const savedReview = await newReview.save();

      // Send the saved review as a response
      return res.status(201).json(savedReview);
  } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ message: 'Failed to create review.' });
  }
};

// Corrected the function declaration
const getReviewsByProductId = async (req, res) => {
  try {
    const { productId } = req.params; // Get the product ID from the route
    const reviews = await Review.find({ productId }); // Find reviews associated with the product ID

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this product.' });
    }

    res.json(reviews); // Return the found reviews
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Delete a review by productId and reviewId
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params; // Get reviewId from request parameters
    console.log('Attempting to delete review with ID:', reviewId);

    const review = await Review.findById(reviewId); // Check if review exists
    if (!review) {
      console.error('Review not found:', reviewId);
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.findByIdAndDelete(reviewId); // Delete the review
    console.log('Review deleted successfully:', reviewId);
    
    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Fetch reviews for a product with pagination
const getPaginatedReviewsByProductId = async (req, res) => {
  const { productId } = req.params;
  const { page = 1, limit = 4 } = req.query; // Default to page 1 and limit 4 reviews

  try {
    // Fetch reviews using pagination
    const reviews = await Review.find({ productId })
      .limit(limit * 1) // Limit to the specified number of reviews
      .skip((page - 1) * limit) // Skip to the relevant page
      .exec();

    // Get the total number of reviews
    const totalReviews = await Review.countDocuments({ productId });

    res.status(200).json({
      reviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching paginated reviews', error });
  }
};




module.exports = {
  getAllReviews, 
  createReview,
  getReviewsByProductId,
  deleteReview,
  getPaginatedReviewsByProductId,

};
