import Product from "../models/product.js";
import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  validateProductSchema,
  validateId,
} from "../models/model_validations.js";

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

  const newProduct = (await product.save()) as mongoose.Document;

  // Clone product to remove version key __v from response
  const { __v, ...otherProps } = newProduct.toObject();
  const productClone = { ...otherProps };

  res.status(200).send({
    responseStatus: res.statusCode,
    responseMessage: productClone,
  });
};

/**
 * Retrieves a single product by its id
 * @param req Client request to server
 * @param resp Server response to client
 * @returns Promise<Response> || void
 */
const getProductById = async (req: Request, res: Response) => {
  const id = req.params.productId;

  const validationResult = validateId(id);

  if (validationResult.error) {
    return res.status(400).send({
      responseStatus: res.statusCode,
      responseMessage: validationResult.error.details[0].message,
    });
  }

  const product = await Product.findById(id, { __v: 0 });

  if (!product) {
    return res.status(404).send({
      responseStatus: res.statusCode,
      responseMessage: "No product found matching id",
    });
  }

  res.status(200).send({
    responseStatus: res.statusCode,
    responseMessage: product,
  });
};

/**
 * Deletes a single product by its id
 * @param req Client request to server
 * @param resp Server response to client
 * @returns Promise<Response> || void
 */
const deleteProductById = async (req: Request, res: Response) => {
  const id = req.params.productId;

  const validationResult = validateId(id);

  if (validationResult.error) {
    return res.status(400).send({
      responseStatus: res.statusCode,
      responseMessage: validationResult.error.details[0].message,
    });
  }

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.status(404).send({
      responseStatus: res.statusCode,
      responseMessage: "No product found matching id",
    });
  }

  res.status(200).send({
    responseStatus: res.statusCode,
    responseMessage: deletedProduct,
  });
};

export { getProducts, createNewProduct, getProductById, deleteProductById };
