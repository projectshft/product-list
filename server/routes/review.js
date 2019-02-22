const router = require('express').Router()
const Product = require('../models/product')
const Review = require('../models/review');


//Returns ALL the reviews, but limited to 40 per page
router.get('/reviews', ((req, res, next) => {
    //paginate
    const perPage = 40
    const page = req.query.page || 1
    Product.find({})
        .populate({
            path: 'reviews'
            // options: {limit: 40}
        })
        //paginate
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, reviews) => {
            if (err) return next(err)
            res.send(reviews)
        })
})
)


//Creates a new review in the database by adding it to the correct product's reviews array
router.post('/:productId/reviews', (req, res, next) => {
    const newReview = new Review({
        userName: req.body.userName,
        reviewText: req.body.reviewText,
        product: req.params.productId
    });
    newReview.save((err) => {
        if (err) return err;
        res.send(newReview);
    });
})


//Deletes a review by its id
router.delete('/reviews/:reviewId', (req, res, next) => {
    Review.findByIdAndDelete(req.params.reviewId, (err) => {
        if (err) throw err;
        res.status(200).send("Delete was successful.");
    })
})

module.exports = router