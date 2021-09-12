const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

//GET all products
router.get("/products", (req, res, next) => {
  const perPage = 9;
  // return the first page by default
  const page = req.query.page || 1;
  const category = req.query.category || null;
  const price = req.query.price || null;
  const query = req.query.query || null;

  const passCategory = () => {
    if (!category) {
      return {};
    } 
    return {category: {$regex: category, $options: 'i'}};
    }

  const passSort = () => {
    if (!price) {
      return {};    
    }
    if (price.toLowerCase() == "highest") {
      return {price: -1};
    }
    if (price.toLowerCase() == "lowest") {
      return {price: 1};
    }
  }

  const passQuery = () => {
    if (!query) {
      return {};
    }
  return {name: {$regex: query, $options: 'i'}}
  }

  Product.find().and([
    passCategory(),
    passQuery()
  ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(passSort())
    .exec((err, products) => {
      if (err) return next(err);

      Product.count().and([
        passCategory(),
        passQuery()
      ])
      .exec((err, count) => {
        if (err) return next(err);

        console.log(`Count: ${count}`);

        res.send(products);
      });
    });
});

//GET a specific product
router.get("/products/:product", (req, res, next) => {
  const {product} = req.params; 

  Product.find({_id: product})
    .exec((err, product) => {
      if (err) return next(err);

      res.send(product[0]);
    });
});

//GET all reviews for a specific product
router.get("/products/:product/reviews", (req, res, next) => {
  const perPage = 4;
  // return the first page by default
  const page = req.query.page || 1;
  const {product} = req.params; 

  Product.find({_id: product})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, product) => {
      if (err) return next(err);

      res.send(product[0].reviews);
    });
});

//POST a new product
router.post("/products", (req, res, next) => {
  const newProduct = new Product();
  newProduct.category = req.body.category;
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.image = req.body.image;
  newProduct.reviews = [];

  newProduct.save((err) => {
    if (err) return next(err);
    console.log('Product successfully added.');
  });
  res.end();
});

//POST a new review for a specific product
router.post("/products/:product/reviews", (req, res, next) => {
  const {product} = req.params;

  Product.find({_id: product})
  .exec((err, product) => {
    if (err) return next(err);

    product[0].reviews.push(req.body);
    product[0].save((err) => {
      if (err) return next(err);
      console.log('Review successfully added.');
    });
  });
  res.end();
});

//DELETE a specific product
router.delete("/products/:product", (req, res, next) => {
  const {product} = req.params;

  Product.find({_id: product})
  .exec((err, product) => {
    if (err) return next(err);

    product[0].remove((err) => {
      if (err) return next(err);
      console.log('Product successfully deleted.');
    })
  });
  res.end();
});

// DELETE a specific review
router.delete("/reviews/:review", (req, res, next) => {
  // const {product} = req.params;
  const {review} = req.params;

  Product.find({reviews: {$elemMatch: {_id: review}}})
  .exec((err, product) => {
    if (err) return next(err);

    product[0].reviews.remove({_id: review});

    product[0].save((err) => {
      if (err) return next(err);
      console.log('Review successfully deleted.');
    });
  });
  res.end();
});

module.exports = router;