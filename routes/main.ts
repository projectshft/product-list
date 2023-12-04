import { Router } from "express";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import Product from "../models/product.js";
import { getProducts } from "../controllers/products.js";

const router = Router();

router.get("/generate-fake-data", async (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = Number(faker.commerce.price());
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    try {
      await product.save();
    } catch (err) {
      throw err;
    }
  }

  res.end();
});

router.get("/products", (req, res) => getProducts(req, res));

export default router;
