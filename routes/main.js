const router = require("express").Router();
const faker = require("faker");
const {Product, Review} = require("../models/product");

// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";

//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

router.get("/products", async (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  await Product.find({})
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

router.get("/reviews", async (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  await Review.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Review.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:product", async (req, res) => {
  await Product.findById(req.params.product, (err, product) => {
    if (err) throw err;
    res.send(product);
  })
})

router.get("/reviews/:review", async (req, res) => {
  await Review.findById(req.params.review, (err, review) => {
    if (err) throw err;
    res.send(review);
  })
})

// GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.

router.get("/products/:product/reviews", async (req, res) => {
  const perPage = 9;

  const page = req.query.page || 1;


  await Product.findById(req.params.product, (err, product) => {
    if (err) throw err;
    res.send(product.reviews)
      
  })
    .skip(perPage * page - perPage)
    .limit(4)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
})

//POST /products: Creates a new product in the database

router.post("/products", async (req, res) => {
  
  const product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: []
  })
  await product.save();
  await res.send(product);
})

//POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's review's array

router.post("/products/:product/reviews", async (req, res) => {
  
  const product = req.params.product;

  const productReviews = await Product.findOne({ _id: product }).populate({path: "reviews"})
  
  const review = new Review({
    userName: req.body.userName,
    text: req.body.text,
    product: product
  })
  await review.save();
  await res.send(review);
  
  await productReviews.reviews.push(review);
  await console.log(productReviews.reviews)
  await productReviews.save();
})

// DELETE /products/:product: Deletes a product by id
router.delete("/products/:product", (req, res, next) => {
  Product.findByIdAndRemove({_id: req.params.product}).then(function(prod){
    res.send(prod);
  })
})



//DELETE /reviews/:review: Deletes a review by id
// router.delete("/products/:product", (req, res, next) => {
//   Product.findByIdAndRemove({_id: req.params.product}).then(function(prod){
//     res.send(prod);
//   })
// })



module.exports = router;