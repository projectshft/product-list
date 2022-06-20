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
            // console.log(product);
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
            // console.log(review);
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
    const perPage = 9;

    // return the first page by default
    const page = req.query.page || 1;

    Product.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, products) => {
    // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
        Product.count().exec((err, count) => {
            if (err) return next(err);

            res.send(products);
        }); 
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
    // res.send(`in /products/:product/reviews get route, product is ${req.product.name}`);
});

router.post("/products", (req, res, next) => {
    res.send('in /products post route');
});

router.post("/products/:product/reviews", (req, res, next) => {
    res.send(`in /products/:product/reviews Post route, product is ${req.product.name}, review is ${req.query.text}`);
});

router.delete("/products/:product", (req, res, next) => {
    res.send(`in /products/:product delete route, product is ${req.product.name}`);
});

router.delete("/reviews/:review", (req, res, next) => {
    res.send(`in /reviews/:review delete route, product is ${req.product.review}`);
});

module.exports = router;