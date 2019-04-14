const router = require('express').Router();
const queryString = require('querystring');
const url = require('url');
const Product = require('../models/product');
const Review = require('../models/review');

// Gets the specific product for a supplied ID for any routes that take a specific product ID

router.param('product', (request, response, next, id) => {
  Product.find({ _id: id }, (error, product) => {
    if (error) {
      response.status(404).send('Product was not found');
    }
    request.product = product;
    next();
  });
});

/* GET This endpoint gets all of the products based upon query parameters specified
   by the user.  If there are no parameters it simply returns all of the products.
   All returns are paginated to 9 products at a time. */

router.get('/products', (request, response) => {
  const parsedURL = url.parse(request.originalUrl);
  let { page, category, price } = queryString.parse(parsedURL.query);

  // Determines the price sort order
  let sortOrder = price === 'lowest' ? 1 : -1;

  // If user didn't specify a page defaults to 1
  typeof page === 'undefined' ? (page = 1) : (page = Number(page)); 

  Product.paginate({}, { page, limit: 9 }, (error, products) => {
    if (error) throw error;

    /* If both category and price filters are defined it returns all products
       matching the specified category sorted in order defined by the price filter. */

    if (category && category !== "" && price && price !== "") {
      Product.paginate(
        { category },
        { page, limit: 9, sort: { price: sortOrder } },
        (error, products) => {
          if (error) throw error;

          // Checks if the page number supplied is valid
          if (!page || page < 1 || page > products.pages) {
            response.status(404).send('Page not found');
          } else {
            products.total === 0
              ? response.status(404).send('No products for that category found')
              : response.send(products);
          }
        }
      );
    }

    /* If only category filter is defined it returns all products
       matching the specified category. */

    else if (category && category !== "") {
      Product.paginate({ category }, { page, limit: 9 }, (error, products) => {
        if (error) throw error;

        // Checks if the page number supplied is valid
        if (!page || page < 1 || page > products.pages) {
          response.status(404).send('Page not found');
        } else {
          products.total === 0
            ? response.status(404).send('No products for that category found')
            : response.send(products);
        }
      });
    }

    /* If only price filter is defined it returns all products
       sorted in order defined by the price filter. */

    else if (price && price !== "") {
      Product.paginate(
        {},
        { page, limit: 9, sort: { price: sortOrder } },
        (error, products) => {
          if (error) throw error;

          // Checks if the page number supplied is valid
          if (!page || page < 1 || page > products.pages) {
            response.status(404).send('Page not found');
          } else {
            products.total === 0
              ? response.status(404).send('No products found')
              : response.send(products);
          }
        }
      );
    } else {
      response.send(products);
    }
  });
});

// GET This endpoint returns a single product based on supplied ID

router.get('/products/:product', (request, response) => {
  response.send(request.product);
});

// POST This endpoint allows a user to add a new product to the database

router.post('/products', (request, response) => {
  const newProduct = new Product({
    category: request.body.category,
    name: request.body.name,
    price: request.body.price,
    image: request.body.image,
    reviews: []
  });
  newProduct.save();
  response.send(newProduct);
});

// POST This endpoint allows a user to add a new review to a product

router.post('/products/:product/reviews', (request, response) => {
  const newReview = new Review({
    userName: request.body.userName,
    text: request.body.text,
    product: request.product[0]
  });
  newReview.save();
  request.product[0].reviews.push(newReview);
  request.product[0].save();
  response.send(newReview);
});

// DELETE This endpoint removes a specific product based on supplied ID

router.delete('/products/:product', (request, response) => {
  Product.findOneAndDelete({ _id: request.product[0]._id }, (error, product) => {
    if (error) throw error;

    // Also deletes the reviews associated with the product from the review collection
    product.reviews.forEach(review => {
      Review.findOneAndDelete({ _id: review._id }, error => {
        if (error) throw error;
      });
    });

    response.send('Product successfully deleted');
  });
});

module.exports = router;