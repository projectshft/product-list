const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

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

router.get("/products", (req, res, next) => {
  const perPage = 9;

  const page = req.query.page || 1;

  const category = req.query.category || null;

  const price = req.query.price || null;

  const search = req.query.query || null;

  const checkSearchQuery = () => {
    if (search) {
      let parsedSearch = search.charAt(0).toUpperCase() + search.slice(1);
      return {name: {$regex: parsedSearch, $options: "i"}};
    } else {
      return {};
    }
  }

  const checkCategoryQuery = function() {
    if (category) {
      let parsedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      return {category: parsedCategory};
    } else {
      return {};
    }
  }

  const checkFindQueries = () => {
    let categoryQuery = checkCategoryQuery();

    let searchQuery = checkSearchQuery();

    let queryObject = {
      ...categoryQuery,
      ...searchQuery
    }

    return queryObject;

  }

  const checkSortQuery = function() {
    switch(price) {
      case 'highest':
        return {price: -1};
      case 'lowest':
        return {price: 1};
      default:
        return {};
    }
  }

  Product.find(checkFindQueries())
    .sort(checkSortQuery())
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count(checkFindQueries()).exec((err, count) => {
        if (err) return next(err);
        const response = {
          products: products,
          productCount: JSON.stringify(count)
        }
        res.send(response);
        
      });
    });
  
});

router.get("/products/:product", (req, res, next) => {

  const productId = req.params.product;

  Product.findOne({_id: productId})
    .exec((err, product) => {
      if (err) return next(err);

      res.send(product);
    });
});

router.get("/products/:product/reviews", (req, res, next) => {

  const productId = req.params.product;

  const perPage = 4;

  const page = req.query.page || 1;

  Review.find({product: productId})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, review) => {
      if (err) return next(err);

      res.send(review);
    });
});

router.post("/products", (req, res, next) => {
  let product = new Product({
    category: faker.commerce.department(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: "https://via.placeholder.com/250?text=Product+Image"
  });

  product.save((err) => {
    if (err) throw err;
  });

  res.end()

})

router.post("/products/:product/reviews", (req, res, next) => {
  const productId = req.params.product;

  Product.findOne({_id: productId})
    .exec((err, product) => {
      if (err) return next(err);

      let review = new Review({
        userName: faker.internet.userName(),
        text: 'Great product!',
        product: product._id
      });

      review.save((err) => {
        if (err) throw err;
      });
      
      if(product.reviews) {
        product.reviews.push(review);
        res.send(product)
      } else{
        res.send('hmmm')
      }
      product.save()
    });
})

router.delete("/products/:product", (req, res, next) => {
  const productId = req.params.product;

  Product.remove({_id: productId})
    .exec((err, product) => {
      if (err) return next(err);

      res.end()
    });
})

module.exports = router;