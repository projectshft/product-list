import { Request, Response } from "express";
import joi from "joi";

// Functions for validating client requests

/**
 * Validates request bodies containing product data
 * @param req Client request to server
 * @returns joi.ObjectSchema
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
 * Validates id is a 24-character hex string 
 * @param id Id passed in params of client request
 * @returns joi.ObjectSchema
 */
const validateId = (id: string) => {
  const idSchema = joi.string().hex().length(24);

  return idSchema.validate(id);
};

export { validateProductSchema, validateId };