const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

//Initial db populating with fake data
// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product()

//     product.category = faker.commerce.department()
//     product.name = faker.commerce.productName()
//     product.price = faker.commerce.price()
//     product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'
//     product.reviews = []

//     let review = new Review()
//     review.userName = faker.name.firstName();
//     review.text = faker.lorem.sentence();
//     review.product = product._id

//     review.save();
//     product.reviews.push(review);

//     product.save((err) => {
//       if (err) throw err
//     })
//   }
//   res.end()
// })

//To uppercase the first letter of query strings so they match our db categories.
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

router.get("/products", (req, res, next) => {
  const { page, category, price } = req.query;
  const perPage = 9;
  // return the first page by default
  const pageNumber = page || 1;
  // Empty object by default, query category if one exists. 
  // Capitalize is to cap first letter of cat name since query comes in as all lowercase. Categories are in db with first letter capitalized.
  const findQuery = category ? { category: category.capitalize() } : {};
  // Sort query string value to pass to .sort(). If string exists and is not highest or lowest, returns "Invalid" so we can identify the bad query and return 400.
  const sortQuery = price === "highest" ? { price: "desc"} : price === "lowest" ? { price: "asc"} : price.length > 0 ? "Invalid" : null
  if (sortQuery === "Invalid") {
     return res.status(400).send("Invalid sort query.");
    }
   Product.find(findQuery)
    .skip(perPage * pageNumber - perPage)
    .limit(perPage)
    .sort(sortQuery)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Product.estimatedDocumentCount().exec((err, count) => {
        if (err) return next(err);
        res.send(products);
      });
    });
});

router.get("/products/:product", (req, res) => {
  productId = req.params.product;
  if (productId.length === 24) {
    Product.findById(productId, (err, product) => {
      if (product) {
        res.status(200).send(product);
      } else {
        return res.status(404).send("Product ID not found.");
      }
    });
  } else {
    return res.status(400).send("Invalid product ID.");
  }
});

router.get("/reviews", (req, res, next) => {
  const perPage = 40;
  // return the first page by default
  const page = req.query.page || 1;
  Review.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back
      Review.estimatedDocumentCount().exec((err, count) => {
        if (err) return next(err);

        res.send(reviews);
      });
    });
});

router.post("/products", (req, res) => {
  const { category, name, price, imageUrl } = req.body;
  if (
    category.length > 0 &&
    name.length > 0 &&
    price.length > 0 &&
    imageUrl.length > 0
  ) {
    product = new Product();
    product.category = category;
    product.name = name;
    product.price = price;
    product.image = imageUrl;
    product.reviews = [];
    product.save();
    res.status(200).send(product);
  } else {
    return res.status(400).send("Invalid product data.");
  }
});

router.post("/:product/reviews", (req, res) => {
  const { text, userName } = req.body;
  const productId = req.params.product;
  if (productId.length === 24) {
    if (text.length > 0 && userName.length > 0) {
      review = new Review();
      review.userName = userName;
      review.text = text;
      review.product = productId;
      Product.findByIdAndUpdate(
        productId,
        { $push: { reviews: review } },
        (err, product) => {
          if (product) {
            review.save();
            res.status(200).send(review);
          } else {
            return res.status(404).send("Product ID not found.");
          }
        }
      );
    } else {
      return res.status(400).send("Invalid userName or text.");
    }
  } else {
    return res.status(400).send("Invalid product ID.");
  }
});

router.delete("/products/:product", (req, res) => {
  const productId = req.params.product;
  if (productId.length === 24) {
    Product.findByIdAndDelete(productId, (err, product) => {
      if (product) {
        res.status(200).send(productId + " successfully deleted.");
      } else {
        return res.status(404).send("Product ID not found.");
      }
    });
  } else {
    return res.status(400).send("Invalid product ID.");
  }
});

router.delete("/reviews/:review", (req, res) => {
  const reviewId = req.params.review;
  if (reviewId.length === 24) {
    Review.findByIdAndDelete(reviewId, (err, review) => {
      if (review) {
        res.status(200).send(reviewId + " successfully deleted.");
      } else {
        return res.status(404).send("Review ID not found.");
      }
    });
  } else {
    return res.status(400).send("Invalid review ID.");
  }
});

module.exports = router;
