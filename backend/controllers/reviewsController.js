const mongoose = require('mongoose');
const Review = require('../models/reviewsModel');

const deleteReview = async (req, res) => {
  res.json({ message: 'Delete Review' });
};

module.exports = { deleteReview };
