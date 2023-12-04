import { Router } from "express";
import { getProducts } from "../controllers/products.js";
import { createProductData, createReviews } from "../controllers/faker.js";

const router = Router();

// Fake data generation routes
router.get("/generate-fake-data", (req, res) => createProductData(req, res));
router.get("/generate-fake-reviews", (req, res) => createReviews(req, res));

// Product routes
router.get("/products", (req, res) => getProducts(req, res));

export default router;
