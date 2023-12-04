// Create fake data for API testing

import { faker } from "@faker-js/faker";
import Product from "../models/product.js";
import Review from "../models/review.js";
import { Request, Response } from "express";

/**
 * Creates 90 fake products
 * @param req Client request to server
 * @param resp Server response to client
 * @returns Promise<void>
 */
const createProductData = async (
  req: Request,
  res: Response
): Promise<void> => {
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
};

/**
 * Adds between 0 and 5 fake reviews per product in database
 * @param req Client request to server
 * @param resp Server response to client
 * @returns Promise<void>
 */
const createReviews = async (req: Request, res: Response): Promise<void> => {
  const productsList = await Product.find();

  productsList.forEach(async (product) => {
    const randomNumber = Math.floor(Math.random() * 6);

    const reviewsList = [];

    for (let i = 0; i < randomNumber; i++) {
      const review = new Review();

      review.userName = faker.internet.userName();
      review.text = faker.lorem.paragraph({ min: 1, max: 3 });
      review.product = product._id;

      const newReview = await review.save();
      reviewsList.push(newReview);
    }

    product.reviews = reviewsList.map((review) => review._id);
    await product.save();
  });

  res.end();
};

export { createProductData, createReviews };
