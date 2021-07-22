const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

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

router.param("product", function (req, res, next, id) {
  Product.find({ _id: id }, function (err, product) {
    if (err) {
      next(err);
    } else {
      req.product = product[0];
      next();
    }
  });
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

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
  res.status(200).send(req.product);
  //const id = req.params.product;
  // Product.findById(id).exec((err, product) => {
  //   if (err) return next(err);
  //   res.status(200).send(product);
  //   res.end();
  // });
});

//GET /products/:product/reviews
router.get("/products/:product/reviews", (req, res, next) => {
  res.status(200).send(req.product.reviews);
});

//POST /products
router.post("/products", (req, res, next) => {
  //add properties validation?
  if (
    !req.body.category ||
    !req.body.name ||
    !req.body.price ||
    !req.body.image
  ) {
    res.status(400).send("Bad request");
  } else {
    const product = new Product(req.body);
    product.save();
    res.status(200).send("Product saved");
  }
});

module.exports = router;
