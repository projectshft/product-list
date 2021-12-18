const router = require("express").Router();
const faker = require("faker");
const product = require("../models/product");
const Product = require("../models/product");
const Review = require("../models/review");

/*
router.get("/generate-fake-data", (req, res, next) => {
    for (let i = 0; i < 90; i++) {

    let review = new Review();

    review.username = "Dummy name"            //faker.pokemon.name();
    review.text = "Dummy text";                   //faker.StarWars.quote();

    review.save((err) => {
        if (err) throw err;
    });

    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews.push(review);


    product.save((err) => {
        if (err) throw err;
    });
    }
    res.end();
});
*/

router.get("/products", (req, res, next) => {
    const perPage = 9;

    // return the first page by default
    const page = req.query.page || 1;
    searchedCategory = req.query.category;


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

// working but need to add pagination
router.get("/products/:product/reviews", (req, res, next) => {
    const perPage = 4;
    const page = req.query.page || 1;
   
   
    const { product } = req.params;
    Product.findById(product)
    .populate("reviews")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, matchingProduct) => {
        if (err) throw err;
        res.send(matchingProduct.reviews);
    });     
});

router.get("/products/:product", (req, res, next) => {
    const { product } = req.params;
   
    Product.findById(product, (err, matchingProduct) => {
        if (err) throw err;
        res.send(matchingProduct);
    })  

});

// creating new post using save
router.post("/products", (req, res, next) => {
    let productToBeAdded = new Product();

    productToBeAdded.category = req.body.category;
    productToBeAdded.name = req.body.name;
    productToBeAdded.price = req.body.price;
    productToBeAdded.image = "https://via.placeholder.com/250?text=Product+Image";
    productToBeAdded.reviews = [];

    productToBeAdded.save((err) => {
    if (err) throw err;
    });

    res.end();
});

// creating new review and pushing it to the correct product
router.post("/products/:product/reviews", (req, res, next) => {
    let reviewToBeAdded = new Review();
    let targetProduct = Product.findById(req.params);

    reviewToBeAdded.username = req.body.username;
    reviewToBeAdded.text = req.body.text;
    reviewToBeAdded.product = targetProduct._id;
    
    targetProduct.reviews.push(reviewToBeAdded);

    res.end();   
}); 

// deleting a product with a specific id
router.delete("/products/:product", (req, res, next) => {
    const { product } = req.params;
    
    Product.findByIdAndRemove(product, (err, matchingProduct) => {
        if (err) throw err;
        res.send(matchingProduct._id + "Has been removed from Products.");
    });  
});

// deleting a review with a specific id
router.delete("/reviews/:review", (req, res, next) => {
    const { review } = req.params;

    Review.findByIdAndRemove( review, (err, matchingReview) => {
        if (err) throw err;
        res.send(matchingReview._id + "has been removed from Reviews.");
    });
});


module.exports = router;