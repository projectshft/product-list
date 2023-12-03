import { faker } from "@faker-js/faker";
import Product from "../models/product.js";
import { Request, Response } from "express";

/**
 * Retrieves list of products in groups of 9
 * @param req Client request to server
 * @param resp Server response to client
 * @returns Promise<void>
 */
const getProducts = async (req: Request, res: Response): Promise<void> => {
  let page = 0;

  // Set page number if included in query params
  if (req.query.page) {
    page = Number(req.query.page)
  }

  const numToSkip = page * 9;

  try {
    const products = await Product.find().skip(numToSkip).limit(9);
    res.send(products);
  } catch (err) {
    throw err;
  }

  res.end();
};

export { getProducts };