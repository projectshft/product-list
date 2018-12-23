const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");
const fetch = require("node-fetch");

/*=====================================================
Generate and populate database with data
NO LONGER NEEDED DATA AS OF 12/20/18 3:11 PM
=====================================================*/
// router.get("/generate-fake-data", async (req, res, next) => {

//   for (let i = 0; i < 500; i++) {
//     let productImg = await fetch("https://picsum.photos/200/300/?random").then(r => r.url);
//     let numberOfReviews = Math.floor(Math.random()*20)
//     let product = new Product();
//     console.log(productImg)
//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = productImg,
//     product.description = faker.lorem.sentences();
//     product.reviews = []

//     for (let k = 0; k < numberOfReviews; k++) {
//       let review = new Review({
//         username: faker.internet.userName(),
//         text: faker.lorem.paragraphs(),
//         rating: Math.floor(Math.random() * 11),
//         product:product._id
//       })
//       review.save()
//       product.reviews.push(review);
//     }

//     product.save(err => {
//       if (err) throw err;
//     });
//     // console.log(product.image)
//   }
//   console.log(("done"))
//   res.end("Success");
// });

router.param("product", async function(req, res, next, id) {
  //this middleware grabs the matching product and adds it to the request
  req.product = await Product.findById(id)
    .populate("reviews")
    .exec();

  next();
});
router.param("review", async function(req, res, next, id) {
  //this middleware grabs the review by ID and adds it to the request
  req.review = await Review.findById(id)
    .populate("products")
    .exec();

  next();
});

router.get("/products", async (req, res, next) => {
  //Setting up all the variables and search terms

  let search = req.query.search;
  let page = req.query.page || 1;
  page = parseInt(page);
  let mongoQueryObj = {};
  //To ensure a category was selected and isn't somehow undefined
  if (req.query.category && req.query.category !== "All") {
    mongoQueryObj.category = req.query.category;
  }
  //default to ascending
  let price = req.query.price;
  if (!price) {
    price = 1;
  } else {
    price = parseInt(price);
  }

  const perPage = 12;

  if (search) {
    Object.assign(mongoQueryObj, {
      $text: { $search: search, $caseSensitive: false }
    });
  }
  Product.find(mongoQueryObj)
    .sort({ price: price })
    .exec((err, result) => {
      res.send({
        total_products: result.length,
        url: req.originalUrl,
        page_count: Math.floor(result.length / perPage),
        page_number: page,
        products: result.slice(page - 1, page + 11)
      });
    });
});

router.get("/products/:product", (req, res) => {
  //uses the param middleware to find the specific product by ID
  res.send(req.product);
});

router.get("/reviews", async (req, res) => {
  let { page } = req.query || 1;
  const perPage = 40;

  let results = await Review.find({})
    .skip(page * perPage - perPage)
    .limit(perPage);
  res.send(results);
});

router.post("/products", async (req, res) => {
  let product = req.body;
  //try and add the item to the database

  let newProduct = new Product({
    category: product.category,
    name: product.name,
    price: product.price,
    image: product.image,
    description: product.description,
    reviews: []
  });
  newProduct
    .save()
    .then(result => res.send("Product Saved"))
    .catch(err => res.status(400).send(err));
});

router.post("/products/:product/reviews", (req, res) => {
  let review = new Review({
    username: req.body.username,
    text: req.body.text,
    rating: req.body.rating,
    product: req.product._id
  });
  req.product.reviews.push(review);
  req.product
    .save()
    .then(() => review.save())
    .then(result => res.send("review saved to database"))
    .catch(err => res.send(err));
});

router.delete("/products/:product/reviews/:review", async (req, res) => {
  await Product.updateOne(
    { _id: req.product._id },
    { $pull: { reviews: req.review._id } }
  ).exec();

  await req.product.save();
  await Review.findByIdAndDelete(req.review._id).exec();
  await req.review.save();
  res.send();
});

router.delete("/products/:product", async (req, res) => {
  await Product.findByIdAndDelete(req.product._id).exec();
  res.send(200);
});

module.exports = router;
