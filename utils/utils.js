/** @module utils */
/** Helper/utility functions */

const Product = require('../models/product');

/**
 * Retrieve products from database given search parameters
 * @param {object} searchParams Object containing search parameters
 * @param {object} pageParams Object containing page parameters
 * @param {object} response API response object
 * @param {boolean} sort Optional parameter if sorting is applied
 *
 * @return {object} API response object
 */
const findProducts = async (
  searchParams,
  pageParams,
  response,
  sort = false
) => {
  let products;
  const { price, page, perPage } = pageParams;

  if (sort) {
    products = await Product.find(searchParams)
      .sort({ price: price.toLowerCase() === 'lowest' ? 1 : -1 })
      .skip(page * perPage - perPage)
      .limit(perPage);
  } else {
    products = await Product.find(searchParams)
      .skip(page * perPage - perPage)
      .limit(perPage);
  }

  const numResults = await Product.countDocuments(searchParams);

  response.writeHead(200, { 'Content-Type': 'application/json' });
  return response.end(JSON.stringify({ numResults, products }));
};

/**
 * Get unique product categories from database and sort alphabetically
 * @param {array} products Array of product objects
 *
 * @return {array} Array of unique product categories
 */
const getUniqueAlphabeticalCategories = (products) => {
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category))
  ];
  const sortedCategories = uniqueCategories.sort();
  return sortedCategories;
};

/**
 * Return a 400 error
 * @param {object} res API response object
 *
 * @return {object} API response object
 */
const return400Error = (res) => {
  res.writeHead(400);
  return res.end('Bad request');
};

/**
 * Return a 404 error
 * @param {object} res API response object
 *
 * @return {object} API response object
 */
const return404Error = (res) => {
  res.writeHead(404);
  return res.end('Not found');
};

module.exports = {
  findProducts,
  getUniqueAlphabeticalCategories,
  return400Error,
  return404Error
};
