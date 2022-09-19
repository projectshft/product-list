const router = require('express').Router();
const { faker } = require('@faker-js/faker');
const Product = require('../models/product');
const Review = require('../models/review');

function createReview(userName, text, product) {
  return new Review({
    userName,
    text,
    product: product._id,
  });
}

function checkIfReviewValid(userName, text, product) {
  if (!product || !text || !userName) {
    return false;
  }

  return true;
}
function setPriceQuery(sortBy, query) {
  const HIGH_TO_LOW = -1;
  const LOW_TO_HIGH = 1;
  if (sortBy.toLowerCase() === 'highest') {
    query.price = HIGH_TO_LOW;
  } else if (sortBy.toLowerCase() === 'lowest') {
    query.price = LOW_TO_HIGH;
  }
}
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

router.get('/generate-fake-data', (req, res, next) => {
  // Generates 90 fake products
  for (let i = 0; i < 90; i += 1) {
    const product = new Product();

    // Generates 20 fake reviews for each product
    for (let j = 0; j < 20; j += 1) {
      const review = new Review({
        userName: faker.internet.userName(),
        text: faker.lorem.sentence(),
        product: product._id,
      });
      review.save((err) => {
        if (err) throw err;
      });
      product.reviews.push(review);
    }

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';
    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router
  .route('/products')
  .get(async (req, res, next) => {
    // Build query object
    const query = {};
    // Optional category query
    if (req.query.category) {
      query.category = req.query.category;
    }
    // Optional search query
    if (req.query.query) {
      query.$text = { $search: req.query.query };
    }
    // Build sort object
    const sortBy = {};
    // Optional sort by price query
    if (req.query.price) {
      setPriceQuery(req.query.price, sortBy);
    }

    // return the first page by default
    let page = req.query.page || 1;
    const productsPerPage = 9;
    // if (Number.isInteger(Number(page))) {
    //   page = Number(page) * productsPerPage - productsPerPage;
    // }

    if (Number(page) < 0) {
      page = 1;
    }

    const options = {
      page: Number(page) || 1,
      limit: productsPerPage,
      sort: sortBy,
      collation: {
        locale: 'en',
        strength: 1,
      },
    };

    Product.paginate(query, options, (err, result) => {
      if (err) next(err);
      res.status(200).json(result);
    });
  })
  .post((req, res, next) => {
    const { category, name, price, image, reviews = [] } = req.body;
    const product = new Product();
    product.category = category;
    product.name = name;
    product.price = price;
    product.image = image;
    reviews.forEach((review) => {
      if (checkIfReviewValid(review.userName, review.text, product)) {
        const newReview = createReview(review.userName, review.text, product);
        newReview.save((err, success) => {
          if (err) next(err);
        });
        product.reviews.push(newReview);
      }
    });
    product.save((err) => {
      if (err) throw err;
    });
    res.status(200).json(product);
  });

router.param('product', (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) next(err);

    req.product = product;
    next();
  });
});

//  GET /products/:product: Returns a specific product by its id
//  POST /products: Creates a new product in the database
//  DELETE /products/:product: Deletes a product by id
router
  .route('/products/:product')
  .get((req, res, next) => {
    if (req.product) {
      res.status(200);
      return res.json(req.product);
    }

    res.status(404);
    return res.send('Error: No product with that id found');
  })
  .delete(async (req, res, next) => {
    try {
      const { product } = req;
      if (product) {
        // Delete product from the DB
        await Product.deleteOne({ _id: product._id });
        // Delete reviews attached to the product from the DB
        await Review.deleteMany({ _id: { $in: product.reviews } });
        // only on success code
        return res.status(204).end();
      }
      return res.status(404).send('Error: No product with that id found');
    } catch (err) {
      next(err);
    }
  });

//  GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.
// ==========================================================================================================================
// POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.

router
  .route('/products/:product/reviews')
  .get(async (req, res, next) => {
    // return the first page by default
    let page = req.query.page || 1;
    const reviewsPerPage = 4;

    // negative number query edge case
    if (Number(page) < 0) {
      page = 1;
    }

    if (req.product) {
      const searchedProduct = req.product;

      const query = {
        product: searchedProduct._id,
      };
      const options = {
        page: Number(page) || 1,
        limit: reviewsPerPage,
        collation: {
          locale: 'en',
          strength: 2,
        },
      };

      Review.paginate(query, options, (err, result) => {
        res.status(200).json(result);
      });
    } else {
      res.status(404);
      return res.send('Error: No product with that id found');
    }
  })
  .post((req, res, next) => {
    const { product } = req;
    const { userName, text } = req.body;

    if (checkIfReviewValid(userName, text, product)) {
      const review = createReview(userName, text, product);
      review.save((err, success) => {
        if (err) next(err);
      });
      product.reviews.push(review);
      product.save((err, success) => {
        if (err) next(err);
      });
      return res.status(200).json(review);
    }

    res.status(400);
    return res.send('Must send text and userName with each review');
  });

//  DELETE /reviews/:review: Deletes a review by id
router.delete('/reviews/:review', async (req, res, next) => {
  try {
    const reviewId = req.params.review;
    // Find if there is a review with the id given
    const reviewToDelete = await Review.findById(reviewId);

    if (reviewToDelete) {
      // Delete document in our DB
      await Review.deleteOne({ _id: reviewToDelete._id });

      // Update the reviews array in related product
      await Product.updateOne(
        { _id: reviewToDelete.product },
        { $pull: { reviews: reviewId } }
      );
      return res.status(204).end();
    }
    return res.status(404).send('Error: No product review with that id found');
  } catch (err) {
    next(err);
  }
});

// add error handling middleware
router.use(errorHandler);
module.exports = router;
