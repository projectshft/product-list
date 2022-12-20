const Review = require('../models/reviewsModel');

const deleteReview = async (req, res) => {
  const { reviewId } = req.body;

  try {
    const deletedReview = await Review.deleteOne({ _id: reviewId });
    if (deletedReview.deletedCount === 0) {
      res.status(400).json({ message: 'No Review Found to Delete' });
    } else {
      res.status(200).json({ 'review deleted': reviewId });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = { deleteReview };
