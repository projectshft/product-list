const router = require("express").Router();
const faker = require("faker");
const { ObjectId } = require("../server");
const Product = require("../models/product");

// GET fake data (populate DB)
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://swr-rf.com/wp-content/uploads/2022/04/ics.png";

    // Commented out as data already saved to DB
    // product.save();
  }
  res.end();
});

// GET all products, paginated. Optional params: page, category, sort, query.
router.get("/products", (req, res, next) => {
  // set default to page 1 if not provided
  const page = req.query.page || 1;
  const productsPerPage = 9;
  const startIndex = (page - 1) * productsPerPage;

  const category = req.query.category; // get the category query parameter
  const price = req.query.price; // get the price query parameter
  const query = req.query.query // get the search query paramater

  Product.find({})
    .skip(startIndex)
    .limit(productsPerPage)
    .exec()
    .then((products) => {
      // Filter products by category if the category query parameter is provided
      if (category) {
        const lowerCaseCategory = category.toLowerCase();
        products = products.filter((product) => product.category.toLowerCase() === lowerCaseCategory);
      }

      // Sort products by price if the price query parameter is provided
      if (price) {
        if (price === "highest") {
          products.sort((a, b) => b.price - a.price); // Sort from high to low
        } else if (price === "lowest") {
          products.sort((a, b) => a.price - b.price); // Sort from low to high
        }
      }

      // Return products matching search query paramater if provided
      if (query) {
        // NEW CODE HERE
        const queryResults = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
        products = queryResults;

      }

      res.send(products);
    })
    .catch((error) => {
      next(error);
    });
});

// GET product by ID
router.get("/products/:productId", (req, res, next) => {
  const productId = req.params.productId;

  if (!ObjectId.isValid(productId)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.send(product);
      }
    })
    .catch((error) => {
      next(error);
    });   
});

// GET all reviews for specific product (paginate 4 per page)
router.get("/products/:productId/reviews", (req, res, next) => {
  const productId = req.params.productId;
  const page = parseInt(req.query.page) || 1;
  const reviewsPerPage = 4;
  const startIndex = (page - 1) * reviewsPerPage;

  if (!ObjectId.isValid(productId)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  Product.findById(productId)
    .select('reviews')
    .slice('reviews', [startIndex, reviewsPerPage])
    .exec()
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.send(product.reviews);
      }
    })
    .catch((error) => {
      next(error);
    });
});

// POST /products: Creates a new product in the database
router.post("/products", (req, res, next) => {
  const product = new Product();
  
  product.category = req.body.category;
  product.name = req.body.name;
  product.price = req.body.price;
  product.image = "https://swr-rf.com/wp-content/uploads/2022/04/ics.png";

  return product.save()
    .then((newProduct) => {
      res.status(201).json({
        message: 'New product successfully added',
        createdProduct: {
          _id: newProduct._id,
          category: newProduct.category,
          name: newProduct.name,
          price: newProduct.price,
          image: newProduct.image,
          reviews: newProduct.reviews,
        }
      });
    })
    .catch((error) => {
      next(error);
    });
});

// // POST Add reviews to product
router.post("/products/:productId/reviews", (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
  .exec()
  .then((product) => {
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newReview = {
      userName: req.body.userName,
      text: req.body.text,
    };

  product.reviews.push(newReview);

  return product.save();
  })
  .then((product) => {
    res.json(product);
  })
  .catch((error) => {
    next(error);
  });
});

// DELETE /products/:product: Deletes a product by id
router.delete("/products/:productId", (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteOne({ _id: productId })
    .exec()
    .then(() => {
      res.status(204).send({ message: "Product succsefully deleted." });
    })
    .catch((error) => {
      next(error);
    });
});


// DELETE /reviews/:review: Deletes a review by id
router.delete("/reviews/:reviewId", (req, res, next) => {
  const reviewId = req.params.reviewId;
  const productId = req.body.productId;
  Product.updateOne(
    { _id: productId },
    { $pull: { reviews: { _id: reviewId } } }
  )
    .exec()
    .then(() => {
      res.status(204).send({ message: "Review succsefully deleted." });
    })
    .catch((error) => {
      next(error);
    });
});




module.exports = router;