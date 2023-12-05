import Product from "../models/product.js";
import Review from "../models/review.js";
import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  validateProductSchema,
  validateId,
  validateReviewSchema,
} from "../models/model_validations.js";

/**
 * Retrieves list of reviews associated with product id in groups of 4 per page
 * @param req Client request to server
 * @param res Server response to client
 * @returns Promise<Response> || void
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

/**
 * Creates a review associated with productId in path
 * @param req Client request to server
 * @param res Server response to client
 * @returns Promise<Response> || void
 */
const createNewReview = async (req: Request, res: Response) => {
  // Validate request body to ensure it matches review schema
  const validationResult = validateReviewSchema(req);

  if (validationResult.error) {
    return res.status(400).send({
      responseStatus: res.statusCode,
      responseMessage: validationResult.error.details[0].message,
    });
  }

  // Validate id matches schema
  const id = req.params.productId;

  const idValidationResult = validateId(id);

  if (idValidationResult.error) {
    return res.status(400).send({
      responseStatus: res.statusCode,
      responseMessage: idValidationResult.error.details[0].message,
    });
  }

  // Validate product exists
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).send({
      responseStatus: res.statusCode,
      responseMessage: "No product found matching id",
    });
  }

  const review = new Review(req.body);

  const newReview = (await review.save()) as mongoose.Document;

  product.reviews.push(newReview._id);
  await product.save();

  // Clone review to remove version key __v from response
  const { __v, ...otherProps } = newReview.toObject();
  const reviewClone = { ...otherProps };

  res.status(200).send({
    responseStatus: res.statusCode,
    responseMessage: reviewClone,
  });
};

/**
 * Deletes a review by id
 * @param req Client request to server
 * @param res Server response to client
 * @returns Promise<Response> || void
 */
const deleteReviewById = async (req: Request, res: Response) => {
  const id = req.params.reviewId;

  const validationResult = validateId(id);

  if (validationResult.error) {
    return res.status(400).send({
      responseStatus: res.statusCode,
      responseMessage: validationResult.error.details[0].message,
    });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).send({
      responseStatus: res.statusCode,
      responseMessage: "No review found matching id",
    });
  }

  const product = await Product.findById(review.product);
  
  if (product) {
    product.reviews = product.reviews.filter(
      (reviewId) => !reviewId.equals(review._id)
    );
 
    await product.save();
  }

  const deletedReview = await Review.findByIdAndDelete(id);

  res.status(200).send({
    responseStatus: res.statusCode,
    responseMessage: deletedReview,
  });
};

export { getReviews, createNewReview, deleteReviewById };
