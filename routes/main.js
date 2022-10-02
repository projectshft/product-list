const router = require("express").Router();
const { response, query } = require("express");
const faker = require("faker");
const product = require("../models/product");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    for (let i = 0; i < 20; i++) {
      let review = new Review();
      (review.username = faker.internet.userName()),
        (review.text = faker.random.words()),
        (review.product = product._id);
      review.save();
      product.reviews.push(review);
    }

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});
router
  .route("/products")
  .get((req, res) => {
    //tested and working
    const perPage = 9;
    // return the first page by default
    const page = req.query.page || 1;

    let searchCategory = () => {
      let category = req.query.category;
      let query = req.query.query;
      if (category && query) {
        return {
          category: category,
          $text: { $search: query },
        };
      }
      if (category) {
        return { category: category };
      }
      if (query) {
        return { $text: { $search: query } };
      }
    };

    const priceSort = () => {
      if (req.query.price) {
        if (req.query.price == "highest") {
          return { price: -1 };
        } else if (req.query.price == "lowest") {
          return { price: 1 };
        } else {
          return null;
        }
      }
    };
    const options = {
      sort: priceSort(),
      offset: perPage * page - perPage,
      limit: perPage,
    };

    Product.paginate(searchCategory(), options, function (err, result) {
      //console.log(result);
      res.send(result);
    });
  })
  // POST /products: Creates a new product in the database
  .post(async (req, res) => {
    //tested and working
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.save();
    res.send(product);
  });
router
  .route("/products/:product")
  // GET /products/:product: Returns a specific product by its id
  .get(async (req, res) => {
    //tested and working
    let product = await Product.findById(req.params.product).exec();
    res.send(product);
  })
  // DELETE /products/:product: Deletes a product by id
  .delete(async (req, res) => {
    //tested and working
    let removedProduct = await Product.findByIdAndDelete(req.params.product);
    res.status(204).end();
  });
router
  .route("/products/:product/reviews")
  // GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.
  .get(async (req, res) => {
    //tested and working
    const perPage = 4;
    // return the first page by default
    const page = req.query.page || 1;
    let product = await Product.findById(req.params.product)
      .populate({ path: "reviews", skip: perPage * page - perPage, limit: 4 })
      .exec();

    res.send(product.reviews);
  })
  // POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
  .post(async (req, res) => {
    let product = await Product.findById(req.params.product);
    let review = new Review();
    (review.username = req.body.username),
      (review.text = req.body.text),
      (review.product = req.body.product);
    review.save();
    product.reviews.push(review);
    res.send(review);
  });
router
  .route("/products/:product/reviews/:review")

  // DELETE /reviews/:review: Deletes a review by id
  .delete(async (req, res) => {
    let removedReview = await Review.findByIdAndDelete(req.params.review);
    res.status(204).end();
  });
router
  .route("/products/categories")
  // GET /products/:product: Returns a specific product by its id
  .get(async (req, res) => {
    //tested and working
    let product = await Product.find(req.params.product).exec();
    res.send(product);
  });

module.exports = router;
