import { Router } from "express";
import {
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
} from "../controllers/products.js";
import { createProductData, createReviews } from "../controllers/faker.js";
import Product from "../models/product.js";
import { getReviews } from "../controllers/reviews.js";

const router = Router();

// Fake data generation routes
router.get("/generate-fake-data", (req, res) => createProductData(req, res));
router.get("/generate-fake-reviews", (req, res) => createReviews(req, res));

// Product routes

// GET products
router.get("/products", (req, res) => getProducts(req, res));
// POST products
router.post("/products", (req, res) => createNewProduct(req, res));
// GET products/:productId
router.get("/products/:productId", (req, res) => getProductById(req, res));
// DELETE products/:productId
router.delete("/products/:productId", (req, res) =>
  deleteProductById(req, res)
);
// GET products/:productId/reviews
router.get("/products/:productId/reviews", (req, res) => getReviews(req, res));
// POST products/:productId/reviews
// DELETE reviews/:reviewId

// example products with populated reviews route
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

export default router;
