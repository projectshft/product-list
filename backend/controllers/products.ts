import Product from "../models/product.js";
import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  validateProductSchema,
  validateId,
  validateQuery,
} from "../models/model_validations.js";
import { AggregationMatch, AggregationSort } from "../types/types.js";

/**
 * Retrieves list of products in groups of 9. Optional query, category, and price queries can be used to filter and sort results.
 * @param req Client request to server
 * @param res Server response to client
 * @returns void || Promise<Response>
 */
const getProducts = async (req: Request, res: Response) => {
  let page = 0;

  // Set page number if included in query params
  if (!isNaN(Number(req.query.page))) {
    page = Number(req.query.page);
  }

  const numToSkip = page * 9;

  const aggMatch: AggregationMatch = { $match: {} };
  const aggSort: AggregationSort = { $sort: {} };

  // Filter by category
  const category = req.query.category;
  if (typeof category === "string") {
    const isValidCategory = validateQuery(category);
    if (isValidCategory.error) {
      return res.status(400).send({
        responseStatus: 400,
        responseMessage: isValidCategory.error.details[0].message,
      });
    }
    aggMatch.$match.category = new RegExp(category, "gi");
  }

  // Search term
  const search = req.query.query;
  if (typeof search === "string") {
    const isValidSearch = validateQuery(search);
    if (isValidSearch.error) {
      return res.status(400).send({
        responseStatus: 400,
        responseMessage: isValidSearch.error.details[0].message,
      });
    }
    aggMatch.$match.name = new RegExp(search, "gi");
  }

  // Sort by price
  const price = req.query.price;
  if (typeof price === "string") {
    switch (price) {
      case "lowest":
        aggSort.$sort.price = 1;
        break;
      case "highest":
        aggSort.$sort.price = -1;
        break;
      default:
        return res.status(400).send({
          responseStatus: res.statusCode,
          responseMessage:
            "The price field must be either 'lowest' or 'highest'",
        });
    }

    const sortedProducts = await Product.aggregate([
      aggMatch,
      aggSort as any,
      { $unset: "__v" },
    ])
      .skip(numToSkip)
      .limit(9);
    const count = await Product.countDocuments(aggMatch.$match);

    return res.status(200).send({
      responseStatus: res.statusCode,
      responseMessage: sortedProducts,
      resultsFound: count,
    });
  }

  // Send products unsorted by default
  const filteredProducts = await Product.aggregate([
    aggMatch,
    { $unset: "__v" },
  ])
    .skip(numToSkip)
    .limit(9);
  const count = await Product.countDocuments(aggMatch.$match);
  res.status(200).send({
    responseStatus: res.statusCode,
    responseMessage: filteredProducts,
    resultsFound: count,
  });
};

/**
 * Creates a new product and adds it to the database
 * @param req Client request to server
 * @param res Server response to client
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
 * @param res Server response to client
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
 * @param res Server response to client
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
