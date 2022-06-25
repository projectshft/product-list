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
    Product.find({review: reviewId}, (err, review) => {
        if(err) {
            res.status(500).send('There was an error with the format of your request');
            throw err;
        };
        if(!review) {
            res.status(404);
            res.send("review not found");
        } else {
            req.review = review;
            next();
        };
    });
});

// router.get("/generate-fake-data", (req, res, next) => {
//     for(let i = 0; i < 90; i++) {
//         let product = new Product();
//         product.category = faker.commerce.department();
//         product.name = faker.commerce.productName();
//         product.price = faker.commerce.price();
//         product.image = "https://via.placeholder.com/205?text=Product+Image";

//         let numReviews = Math.ceil(Math.random() * 20);
//         for(let j = 0; j < numReviews; j++) {
//             let review = new Review({
//                 userName: faker.name.findName(),
//                 text:faker.lorem.lines(1),
//                 product: product._id
//             });
//             review.save((err) => {
//                 if(err) {
//                     console.error(err);
//                     throw err;
//                 }
//             });
//             product.reviews.push(review._id);
//         };
//         product.save((err) => {
//             if(err) throw err;
//         });
//     }
//     res.end();
// });

// router.get("/products", (req, res, next) => {
//     let page = Number(req.query.page);
//     console.log(page);
//     Product.find((error, products) => {
//         // console.log(products.slice(0, 9));
//         console.log(products.slice((page - 1) * 10, (page * 10) - 1).length);
//         res.send(products.slice((page - 1) * 10, (page * 10) - 1));
//     });
// });

router.get("/products", (req, res, next) => {
    console.log('hit the products GET route');
    const perPage = 9;
    // return the first page by default
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

    Product.find(query, {}, options).exec((err, products) => {
        if(err) {
            console.error(err);
            throw(err);
        } else {
            Product.count().exec((err, count) => {
                if(err) return next(err);
                res.send(products);
            });
        }
    });
    // Product.find({})
    //     .skip(perPage * page - perPage)
    //     .limit(perPage)
    //     .exec((err, products) => {
    // // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
    //     Product.count().exec((err, count) => {
    //         if (err) return next(err);

    //         res.send(products);
    //     }); 
    // });
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
    // res.status(200).send(req.product);
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
                Review.deleteMany({product: req.product_id}).then(res.status(200).send(product));
            } else {
                res.status(404).send('product not found');
            }            
        }
    });
});

router.delete("/reviews/:review", (req, res, next) => {
    res.send(`in /reviews/:review delete route, product is ${req.product.review}`);
});

module.exports = router;