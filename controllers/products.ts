import Product from "../models/product.js";
import { Request, Response } from "express";
import { validateProductSchema } from "../models/model_validations.js";

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
 * @returns Promise<Response> || void
 */
const createNewProduct = async (req: Request, res: Response) => {
  const validationResult = validateProductSchema(req);

  if (validationResult.error) {
    return res.status(400).send({
      responseStatus: res.statusCode,
      responseMessage: validationResult.error.details[0].message,
    });
  }

  const product = new Product(req.body);

  const newProduct = await product.save();

  res.status(200).send({
    responseStatus: res.statusCode,
    responseMessage: newProduct,
  });
};

/**
 * Retrieves a single product by its id
 * @param req Client request to server
 * @param resp Server response to client
 * @returns Promise<Response>
 */
const getProductById = async (req: Request, res: Response) => {};

export { getProducts, createNewProduct, getProductById };
