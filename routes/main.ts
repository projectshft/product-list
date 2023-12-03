import { Router } from "express";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import Product from "../models/product.js";

const router = Router();

router.get("/generate-fake-data", async (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = Number(faker.commerce.price());
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    try {
      await product.save();
    } catch (err) {
      throw err;
    }
  }

  res.end();
});

router.get("/products", async (req, res, next) => {
  let page = 0;

  if (req.query.page) {
    page = Number(req.query.page)
  }

  const numToSkip = page * 9;

  try {
    const products = await Product.find().skip(numToSkip).limit(9);
    res.send(products);
    console.log(req.query);
  } catch (err) {
    throw err;
  }

  res.end();
});

export default router;
