const Review = require('../models/reviewsModel')
const mongoose = require('mongoose')

const deleteReview = async (req, res) => {
  res.json({message: "Delete Review"})
}

module.exports = { deleteReview }