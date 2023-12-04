import { Router } from "express";
import { getProducts } from "../controllers/products.js";
import { createProductData, createReviews } from "../controllers/faker.js";
import Product from "../models/product.js";

const router = Router();

// Fake data generation routes
router.get("/generate-fake-data", (req, res) => createProductData(req, res));
router.get("/generate-fake-reviews", (req, res) => createReviews(req, res));

// Product routes
router.get("/products", (req, res) => getProducts(req, res));

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
