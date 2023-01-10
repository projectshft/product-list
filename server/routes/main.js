const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const Product = require("../models/product");
const Review = require("../models/review.js")

router.get("/generate-fake-data", async (req, res, next) => {
  try {
    for (let i = 0; i < 90; i++) {
      let product = new Product();
      product.category = faker.commerce.department();
      product.name = faker.commerce.product();
      product.price = faker.commerce.price();
      product.image = "https://via.placeholder.com/250?text=Product+Image";
      await product.save();
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

router.get("/generate-fake-reviews", async (req, res, next) => {
  try {
    const products = await Product.find({});
    for (const product of products) {
      console.log(product)
      for (let i = 0; i < 2; i++) {
        let review = new Review();
        review.username = faker.name.firstName();
        review.text = faker.lorem.sentences();
        product.reviews.push(review);
        await review.save();
      }
      await product.save();
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});


router.get("/message", (req, res) =>{
  res.send('hello');
})

router.get("/products", (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const category = req.query.category;
  const sort = req.query.sort;
  const item = req.query.item;

  let query = {};
  if (category && category !== 'default') {
    query.category = category;
  }

  let sortOptions = {};
  if (sort === "highToLow") {
    sortOptions.price = -1;
  } else if (sort === "lowToHigh") {
    sortOptions.price = 1;
  }

  if (item){
    query.$text = { $search: item};
  }

  Product.find(query)
    .sort(sortOptions)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
    
      Product.count(query).exec((err, count) => {
        if (err) return next(err);
        res.send({ products, total: count});
      });
    });
});

router.get("/products/:productId", async (req, res) => {
  const id = req.params.productId;
  const product = await Product.findById(id)
  res.json(product)
});

router.get("/products/:productId/reviews", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).populate("reviews");
    res.send(product.reviews);
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

router.post('/products', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    reviews: []
  });

  newProduct.save((err, product) => {
    if (err) {
      res.send(err);
    } else {
      res.json(product);
    }
  });
});

module.exports = router;