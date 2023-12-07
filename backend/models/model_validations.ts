import { Request } from "express";
import joi from "joi";

// Functions for validating client requests

/**
 * Validates request bodies containing product data
 * @param req Client request to server
 * @returns joi.ValidationResult
 */
const validateProductSchema = (req: Request) => {
  const productSchema = joi.object({
    category: joi.string().required(),
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().uri().required(),
    reviews: joi.array().items(joi.string()).required(),
  });

  return productSchema.validate(req.body);
};

/**
 * Validates request bodies containing review data
 * @param req Client request to server
 * @returns joi.ValidationResult
 */
const validateReviewSchema = (req: Request, id: RegExp) => {
  const reviewSchema = joi.object({
    userName: joi.string().required(),
    text: joi.string().required(),
    product: joi.string().hex().length(24).pattern(id).required(),
  });

  return reviewSchema.validate(req.body);
};

/**
 * Validates id is a 24-character hex string
 * @param id Id passed in params of client request
 * @returns joi.ValidationResult
 */
const validateId = (id: string) => {
  const idSchema = joi.string().hex().length(24);

  return idSchema.validate(id);
};

/**
 * Validates queries are strings containing only alphanumeric characters
 * @param string string passed in query
 * @returns joi.ValidationResult
 */
const validateQuery = (string: string) => {
  const querySchema = joi.string().pattern(/^[A-Za-z0-9 ]+$/);

  return querySchema.validate(string);
};

export { validateProductSchema, validateReviewSchema, validateId, validateQuery };
