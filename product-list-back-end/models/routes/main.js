const router = require("express").Router();
const { ReactReduxContext } = require("react-redux");
const {Product, Review} = require("../product");

router.get("/products", async (req, res, next) => {
  const perPage = 9;
  
  const page = req.query.page || 1;

  await Product.find(req.query)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(req.query.sort)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/reviews", async (req, res, next) => {
  const perPage = 9;

  const page = req.query.page || 1;


  await Review.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
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
  }).clone().catch(function(err){ console.log(err)})
})

router.get("/products", async (req, res) => {
  await Product.find({$regex: req.query})
})

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
  
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
})

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

router.delete("/products/:product", (req, res, next) => {
  Product.findByIdAndRemove({_id: req.params.product}).then(function(prod){
    res.send(prod);
  })
})

router.delete("/reviews/:reviews", (req, res, next) => {
  Review.findByIdAndRemove({_id: req.params.reviews}).then(function(rev){
    res.send(rev);
  })
})

module.exports = router;