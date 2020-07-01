const router = require("express").Router();
const faker = require("faker");
const ReviewSchema = require("../models/review");
const Product = require("../models/product");
const { response } = require("express");
const Review = require("../models/review").Review;

router.get("/generate-fake-data", (req, res, next) => {
  const fakeImages = [
    "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=987&q=80",
    "https://images.unsplash.com/photo-1506544777-64cfbe1142df?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
    "https://images.unsplash.com/photo-1573866926487-a1865558a9cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
    "https://images.unsplash.com/photo-1515544699701-86e5f26b66d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80",
    "https://images.unsplash.com/photo-1530016143569-dc4a7c89173b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80",
    "https://images.unsplash.com/photo-1525740615880-50bb88fe0b1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80",
    "https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1563529427727-cb7f13f3a756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1959&q=80",
    "https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1901&q=80",
  ];

  for (let i = 0; i < 90; i++) {
    let product = new Product();

    let randomNumber = Math.floor(Math.random() * Math.floor(9));

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = fakeImages[randomNumber];

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

// we want to grab and send the product id for different routes that need it
router.param("product", function (req, res, next, id) {
  // we need to find the product that matches
  Product.findById(id, (err, product) => {
    if (err) throw err;
    if (!product) {
      return res.send("There is no product associated with that review ID");
    } else {
      req.product = product;
    }
    next();
  });
});

// we should be able to find a product by a review Id, too
router.param("review", function (req, res, next, id) {
  // we need to search through products since our data is nested

  Product.findOne({ reviews: { $elemMatch: { _id: id } } }).exec(
    (err, product) => {
      if (!product) {
        res.status(404);
        return res.send("There is no product in our store matching that id");
      } else {
        req.product = product;
      }
      next();
    }
  );
});

// gets the products, paginated
router.get("/products", (req, res, next) => {
  // we'll need an array for conditions
  const conditions = {};

  // update conditions for search queries
  if (req.query.category) {
    conditions.category = req.query.category;
  }

  // update conditions for search queries
  if (req.query.query) {
    var regex = new RegExp(req.query.query);
    conditions.name = { $regex: regex, $options: "i" };
  }

  // setting options up for query

  const perPage = 9;
  const page = req.query.page || 1;

  let options = {
    skip: perPage * page - perPage,
    limit: perPage,
  };

  // sorting -- an optional option
  if (req.query.sort) {
    // in case someone does it via the URL (not the page)
    const lowerCaseQuery = req.query.sort.toLowerCase();

    // sort in descending order if starting highest
    options.sort = {
      price: lowerCaseQuery === "highest" ? "descending" : "ascending",
    };
  }

  Product.find(conditions, null, options).exec((err, products) => {
    /* Note that we're not sending `count` back at the moment, 
      but in the future we might want to know how many are coming 
      back so we can figure out the number of pages */
    Product.find(conditions)
      .count()
      .exec((err, count) => {
        if (err) return next(err);
        // add count to beginning of result, so that we can access for pagination
        products.unshift({ count: count });
        res.send(products);
      });
  });
});

// Returns a specific product by its id
router.get("/products/:product", (req, res) => {
  res.send(req.product);
});

// Returns ALL the reviews for a product, but limited to 4 at a time.
router.get("/products/:product/reviews", (req, res) => {
  // this is how many reviews to show at a time
  const perReq = 4;

  // in order to limit, we'll use $slice
  // we need to determine where to start slicing from
  if (req.query.page) {
    skipAmount = (req.query.page - 1) * perReq;
  } else {
    // start from the top if there is no page query passed
    skipAmount = 0;
  }

  Product.findById(
    req.params.product,
    {
      reviews: { $slice: [skipAmount, perReq] },
    },
    (err, trimmed) => {
      return res.send(trimmed.reviews);
    }
  );
});

// Creates a new product in the database
router.post("/products", (req, res) => {
  // create the new product object based on its constructor
  const newProduct = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: [],
  });

  Product.create(newProduct, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Creates a new review in the database by adding it to the correct product's reviews array.
router.post("/products/:product/reviews", (req, res) => {
  // construct the comment
  const comment = {
    userName: req.body.userName,
    text: req.body.text,
  };

  // add the review to the post
  req.product.reviews.push(comment);

  req.product.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Deletes a product by id
router.delete("/products/:product", (req, res) => {
  req.product.remove((err) => {
    if (err) throw err;
    return res.send("Person successfully deleted");
  });
});

// Deletes a review by id
router.delete("/reviews/:review", (req, res) => {
  // we already found the parent product with router.param
  // so now we just need to remove the right review and save
  req.product.reviews.id(req.params.review).remove();
  req.product.save((err, data) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(data);
    }
  });
});

module.exports = router;
