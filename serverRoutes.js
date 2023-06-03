const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const Product = require("./schema.js");
// const Review = require("./schema.js");
const { Product, Review } = require("./schema.js");

const PORT = process.env.PORT || 9000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET /products/:product: Returns a specific product by its id
app.get("/products/:product", function (request, response) {
  const productId = request.params.product;

  //not sure why it wasnt working before. degged for a long time maybe it didnt like the .populate? not able to findbyid?
  Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        response.status(404).send("Product not found.");
      } else {
        response.send(product);
      }
    })
    .catch(function (err) {
      console.log(err);
      response
        .status(500)
        .send("An error occurred while fetching the product.");
    });
});

//not working
// GET /products/:product/reviews: Returns ALL the reviews for a product, but limited to 4 at a time. This one will be a little tricky as you'll have to retrieve them out of the products. You should be able to pass in an optional page query parameter to paginate.
app.get("/products/:product/reviews", function (request, response) {
  const productId = request.params.product;

  Product.findById(productId)
    .populate("reviews")
    .exec()
    .then((product) => {
      if (!product) {
        response.status(404).send("Product not found");
      } else {
        response.send(product.reviews);
      }
    })
    .catch(function (err) {
      console.log(err);
      response
        .status(500)
        .send("An error occurred while fetching the product.");
    });
});

//for some reason this is saving it to review instead products
// POST /products: Creates a new product in the database
app.post("/products", function (request, response) {
  const { name, price, category } = request.body;

  let newProduct = new Product({
    name: name,
    price: price,
    category: category,
    reviews: [],
  });

  newProduct
    .save()
    .then((savedProduct) => {
      response.status(201).json(savedProduct);
    })
    .catch((error) => {
      console.error("Error creating a product");
    });
});
// {
//     "name": "shirt",
//     "price": "15",
//     "category": "clothing"
// }

// POST /products/:product/reviews: Creates a new review in the database by adding it to the correct product's reviews array.
app.post("/products/:product/post/reviews", function (request, response) {
  const productId = request.params.product;
  const { username, text } = request.body;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        response.status(404).send("Product not found");
      } else {
        let newReview = new Review({
          username: username,
          text: text,
          productId: productId,
        });

        newReview
          .save()
          .then((savedReview) => {
            product.reviews.push(savedReview);
            return product.save();
          })
          .then(() => {
            response.status(201).json(newReview);
          })
          .catch((error) => {
            console.error("Error creating a review:", error);
            response
              .status(500)
              .send("An error occurred while creating the review.");
          });
      }
    })
    .catch((error) => {
      console.error("Error finding product:", error);
      response.status(500).send("An error occurred while finding the product.");
    });
});
// {
//     "username": "beck",
//     "text": "the hat is good",
//     "productId": [] 
// }

// DELETE /products/:product: Deletes a product by id
app.delete("/products/:product", function (request, response) {
  const productId = request.params.product;

  // Find the product by ID and delete it
  Product.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        // If the product is not found, send a 404 response
        response.status(404).send("Product not found.");
      } else {
        // If the product is successfully deleted, send a success message
        response.status(200).send("Product deleted successfully.");
      }
    })
    .catch((error) => {
      // If an error occurs during the deletion process, send a 500 response
      console.error("Error deleting product:", error);
      response
        .status(500)
        .send("An error occurred while deleting the product.");
    });
});

// DELETE /reviews/:review: Deletes a review by id
app.delete("/reviews/:review", function (request, response) {
  const reviewId = request.params.review;
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

//module.exports = app;
