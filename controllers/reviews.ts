import Product from "../models/product.js";
import Review from "../models/review.js";
import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  validateProductSchema,
  validateId,
} from "../models/model_validations.js";

/**
 * Retrieves list of reviews associated with product id in groups of 4 per page
 * @param req Client request to server
 * @param res Server response to client
 * @returns Promise<void>
 */
const getReviews = async (req: Request, res: Response) => {
  const id = req.params.productId;

  const validationResult = validateId(id);

  if (validationResult.error) {
    return res.status(400).send({
      responseStatus: res.statusCode,
      responseMessage: validationResult.error.details[0].message,
    });
  }

  let page = 0;

  // Set page number if included in query params
  if (req.query.page) {
    page = Number(req.query.page);
  }

  const numToSkip = page * 4;

  const reviews = await Review.find({ product: id }, { __v: 0 })
    .skip(numToSkip)
    .limit(4);

  res.status(200).send({
    responseStatus: res.statusCode,
    responseMessage: reviews,
  });
};

export { getReviews };
