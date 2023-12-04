import Product, { ProductType } from "../models/product.js";
import { Request, Response } from "express";
import joi from "joi";

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
    page = Number(req.query.page);
  }

  const numToSkip = page * 9;

  try {
    const products = await Product.find({}, { __v: 0 })
      .skip(numToSkip)
      .limit(9);
    res.send(products);
  } catch (err) {
    throw err;
  }

  res.end();
};

/**
 * Creates a new product and adds it to the database
 * @param req Client request to server
 * @param resp Server response to client
 * @returns Promise<void>
 */
const createNewProduct = async (req: Request, res: Response) => {
  // if missing product object from body or any properties, return 400 error
  const productSchema = joi.object({
    category: joi.string().required(),
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().uri().required(),
    reviews: joi.array().items(joi.string()).required(),
  });

  const validationResult = productSchema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send({
        responseStatus: res.statusCode,
        responseMessage: validationResult.error.details[0].message,
      });
  }

  return res.send("Good!");
};

export { getProducts, createNewProduct };
