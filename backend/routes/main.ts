import { Router } from "express";
import {
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
} from "../controllers/products.js";
import {
  getReviews,
  createNewReview,
  deleteReviewById,
} from "../controllers/reviews.js";
import { createProductData, createReviews } from "../controllers/faker.js";
import Product from "../models/product.js";

const router = Router();

// Fake data generation routes
router.get("/generate-fake-data", (req, res) => createProductData(req, res));
router.get("/generate-fake-reviews", (req, res) => createReviews(req, res));

// Product routes

router.get("/products", (req, res) => getProducts(req, res));
router.post("/products", (req, res) => createNewProduct(req, res));
router.get("/products/:productId", (req, res) => getProductById(req, res));
router.delete("/products/:productId", (req, res) =>
  deleteProductById(req, res)
);
router.get("/products/:productId/reviews", (req, res) => getReviews(req, res));
router.post("/products/:productId/reviews", (req, res) =>
  createNewReview(req, res)
);
router.delete("/reviews/:reviewId", (req, res) => deleteReviewById(req, res));

// Products with populated reviews route
router.get("/reviews", async (req, res) => {
  try {
    const products = await Product.find({}, { __v: 0 })
      .populate({ path: "reviews", select: "-__v" })
      .limit(9);
    res.send(products);
  } catch (err) {
    throw err;
  }

  res.end();
});

// Get list of all categories
router.get("/categories", async (req, res) => {
  try {
    const products = await Product.find();
    const categories: Array<string> = [];
    products.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    res.send(categories);
  } catch (err) {
    throw err;
  }

  res.end();
});

export default router;
