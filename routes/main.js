const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
    for(let i = 0; i < 90; i++) {
        let product = new Product();
        product.category = faker.commerce.department();
        product.name = faker.commerce.productName();
        product.price = faker.commerce.price();
        product.image = "https://via.placeholder.com/205?text=Product+Image"

        product.save((err) => {
            if(err) throw err;
        });
    }
    res.end();
});

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
    res.send('in /products/:product get route');
    let productId = req.params.product;
    if(!productId) {
        res.status(404);
        res.send("Product not found");
    }
});

router.get("/products/:product/reviews", (req, res, next) => {
    res.send('in /products/:product/reviews get route');
    let productId = req.params.product;
    if(!productId) {
        res.status(404);
        res.send("Product not found");
    }
});

router.post("/products", (req, res, next) => {
    res.send('in /products post route');
});

router.post("/products/:product/reviews", (req, res, next) => {
    res.send('in /products/:product/reviews Post route');
    let productId = req.params.product;
    if(!productId) {
        res.status(404);
        res.send("Product not found");
    }
});

router.delete("/products/:product", (req, res, next) => {
    res.send('in /products/:product delete route');
    let productId = req.params.product;
    if(!productId) {
        res.status(404);
        res.send("Product not found");
    }
});

router.delete("/reviews/:review", (req, res, next) => {
    res.send('in /reviews/review delete route');
    let reviewId = req.params.review;
    if(!reviewId) {
        res.status(404);
        res.send("Review not found");
    }
});

module.exports = router;