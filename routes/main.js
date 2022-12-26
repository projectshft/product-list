const router = require("express").Router();
// const faker = require("faker");
const Product = require("../models/product.js");


// class ProductRepository {
//   findById(id) {}

//   set(id, value) {}
// }
// class Store {
//   constructor(productRepository, reviewRepository) {
//     this.productRepository = productRepository;
//     this.reviewRepository = reviewRepository;
//   }
//   addProduct(id, product) {
//     this.productRepository.set(id, product);
//   }
//   addReview() {}

//   removeProduct() {}

//   removeReview() {}

//   listProducts() {}

//   listReviews() {}
// }

// router.get("/generate-fake-data", (req, res) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";
//     product.reviews = [];

//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

// router.get("/generate-fake-data", (req, res) => {
//   Product.find({ name: "Unbranded Concrete Soap" }, (err, products) => {
//     if (err) console.error(err);
//     products[0].reviews.push({ userName: "boguta", text: "Comment 1" });
//     products[0].reviews.push({ userName: "boguta", text: "Comment 2" });
//     products[0].reviews.push({ userName: "boguta", text: "Comment 3" });
//     products[0].reviews.push({ userName: "boguta", text: "Comment 4" });
//     products[0].save();
//   });
// });

router.get("/products", (req, res, next) => {
  const perPage = 9;
  // return the first page by default
  const page = req.query.page || 1;
  const category = req.query.category || null;
  const price = req.query.price || null;
  const query = req.query.query || "";

  let filter = {};

  if (category) {
    filter.category = category;
  }
  if (query) {
    filter.name = { $regex: query, $options: "i" };
  }

  let criteria = 1;

  if (price) {
    if (price === "Highest") {
      criteria = -1;
    }
  }

  Product.find(filter)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort({ price: criteria })
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);

        res.send(products);
      });
    });
});

router.get("/products/:productID", (req, res) => {
  const id = req.params.productID;
  Product.findById(id).exec((err, product) => {
    if (err) throw err;
    res.send(product);
  });
});

router.get("/products/:productID/reviews", (req, res) => {
  const perPage = 4;
  const id = req.params.productID;

  const page = req.query.page || 1;

  Product.find({ _id: id })
    .select("reviews")
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, reviews) => {
      if (err) console.error(err);
      let startIndex = perPage * page - perPage;
      let endIndex = startIndex + perPage;

      res.send(reviews[0].reviews.slice(startIndex, endIndex));
    });
});

router.post("/products", (req, res) => {
  let newProduct = new Product();
  newProduct.category = req.body.category;
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.image = req.body.image;
  newProduct.save((err) => {
    if (err) throw err;
  });
  res.end();
});

router.post("/products/:productID/reviews", (req, res) => {
  Product.find({ _id: req.params.productID }, (err, products) => {
    if (err) console.error(err);
    products[0].reviews.push({
      userName: req.body.userName,
      text: req.body.text,
    });
    products[0].save((err) => {
      if (err) throw err;
    });
  });
});

router.delete("/products/:productID", (req, res) => {
  Product.deleteOne({ _id: req.params.productID }, (err, products) => {
    if (err) return console.error(err);
    res.sencvwdfaeafad(products);
  });
});

router.delete("/products/:productID/reviews/:reviewID", (req, res) => {
  Product.update(
    {id: req.params.productID},
    { $pull: { reviews: { _id: req.params.reviewID } } },
    (err, review) => {
      if (err) {
        console.error(err);
        return res.status(404).json({})
      }
      res.send(review);
    }
  );
});

module.exports = router;
