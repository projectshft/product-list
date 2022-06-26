const express = require("express");
const router = express.Router(); 
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.param("product", function(req, res, next, productId) {
    Product.findById(productId, (err, product) => {
        if(err) {
            res.status(500).send('There was an error with the format of your request');
            throw err;
        };
        if(!product) {
            res.status(404);
            res.send("product not found");
        } else {
            req.product = product;
            next();
        };
    });
});

router.param("review", function(req, res, next, reviewId) {
    Review.findById(reviewId, (err, review) => {
        if(err) {
            res.status(500).send('There was an error with the format of your request');
            throw err;
        };
        if(!review) {
            console.log('in param router');
            res.status(404).send("review not found");
        } else {
            req.review = review;
            next();
        };
    });
});



router.get("/products", (req, res, next) => {
    console.log('hit the products GET route');
    const perPage = 9;
    const page = req.query.page || 1;
    const query = {};
    const options = req.query.sort ? {sort: {price: req.query.sort === "lowest" ? "asc" : "desc"}} : {}
    let regex;
    if(req.query.category) {
        query.category = req.query.category
    };
    
    if(req.query.query) {
        regex = new RegExp(req.query.query, 'i');
        //I wasn't sure if we were supposed to have it search for the search keyword in either the name or category of the product but this is how I would have done it if I wanted the user to be able to return products whose name or category contained the search keyword
        // query.$or = [{category: regex}, {name: regex}]
        query.name = regex;

    }

    Product.find(query, {}, options)
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, products) => {
        if(err) {
            console.error(err);
            throw(err);
        } else {
            Product.count().exec((err, count) => {
                if(err) return next(err);
                res.send({
                    products,
                    options: {
                        query: req.query.query,
                        category: req.query.category,
                        sort: req.query.sort,
                        page: req.query.page
                    }
                });
            });
        }
    });
});

router.get("/products/:product", (req, res, next) => {
    req.product.populate("reviews", (err, product) => {
        if(err) {
            console.error(err);
            throw err;
        } else {
            res.status(200).send(product);
        }
    });
});

router.get("/products/:product/reviews", (req, res, next) => {
    const perPage = 4
    const page = req.query.page || 1;
    Review.find({product: req.product._id})
        .skip(page * perPage - perPage)
        .limit(4)
        .exec((err, reviews) => {
            Review.count().exec((err, count) => {
                if (err) return next(err);
                res.send(reviews);
            });
        });
});

router.post("/products", (req, res, next) => {
    let body = req.body;
    if(!(body.category && body.name && body.price && body.image)) {
        res.status(404).send('Missing either category, name, price, or image url for product');
    } else {
        let newProduct = new Product({
            category: body.category,
            name: body.name,
            price: body.price,
            image: body.image
        });
        newProduct.save(err => {
            if(err) {
                console.error(err)
                throw err;
            }
            });
        res.status(200).send(newProduct);
    };
});

router.post("/products/:product/reviews", (req, res, next) => {
    let body = req.body;
    if(!(body.userName && body.text)) {
        res.status(404).send('Missing either category, name, price, or image url for product');
    } else {
        let newReview = new Review({
            userName: body.userName,
            text: body.text,
            product: req.product._id
        });
        newReview.save(err => {
            if(err) {
                console.error(err);
                throw err;
            }
        });
        req.product.reviews.push(newReview._id);
        req.product.save(err => {
            if(err) {
                console.error(err);
                throw err;
            }
        });
        res.status(200).send(newReview);
    };
});

router.delete("/products/:product", (req, res, next) => {
    Product.findByIdAndDelete(req.product._id, (err, product) => {
        if(err) {
            console.error(err);
            throw err;
        } else {
            if(product) {
                Review.deleteMany({product: req.product._id}).then(res.status(200).send(product));
            } else {
                res.status(404).send('product not found');
            }            
        }
    });
});

router.delete("/reviews/:review", (req, res, next) => {
    Review.findByIdAndDelete(req.review._id, (err, review) => {
        if(err) {
            console.error(err);
            throw err;
        } else {
            if(review) {
                Product.findByIdAndUpdate(review.product, {$pull: {reviews: req.review._id}}, (err, product) => {
                    if(err) {
                        console.error(err);
                        throw err;
                    }
                    res.status(200).send(review);
                });
            } else {
                console.log("in delete route");
                res.status(404).send('review not found');
            }
        }
    });
});

module.exports = router;