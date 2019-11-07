const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review')


// returns ALL reviews, 40 at a time, paginate.
router.get('/reviews', (req, res, next) => {

})

// delete review by ID
router.delete('/reviews/:reviewId', (req, res, next) => {

})
