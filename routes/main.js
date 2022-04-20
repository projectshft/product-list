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

router.get("/products/:product", async (req, res) => {
  await Product.findById(req.params.product, (err, product) => {
    if (err) throw err;
    res.send(product);
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
  res.send(product);
})


module.exports = router;