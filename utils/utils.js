const Product = require('../models/product');

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

const getUniqueAlphabeticalCategories = (products) => {
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category))
  ];
  const sortedCategories = uniqueCategories.sort();
  return sortedCategories;
};

const return400Error = (res) => {
  res.writeHead(400);
  return res.end('Bad request');
};

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
