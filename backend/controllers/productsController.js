const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('../models/productsModel');
const Review = require('../models/reviewsModel');

// get all products
const getAllProducts = async (req, res) => {
  const { sort, category, search } = req.query;

  const perPage = 9;
  const page = req.query.page || 1;

  // build query parameter based on incoming queries
  const query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  let products;

  if (!sort) {
    products = await Product.find(query)
      .skip(perPage * page - perPage)
      .limit(perPage);
  }

  if (sort === 'priceHighest') {
    products = await Product.find(query)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ price: -1 });
  } else if (sort === 'priceLowest') {
    products = await Product.find(query)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ price: 1 });
  } else if (sort === 'nameAscending') {
    products = await Product.find(query)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ name: 1 });
  } else if (sort === 'nameDescending') {
    products = await Product.find(query)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ name: -1 });
  }

  // get product count of product query for pagination
  /* This is querying the database twice.  Need to figure out a way to return this within the first query */
  const productCount = await Product.count(query);

  if (!products) {
    res.status(400).json({ message: 'error' });
    return;
  }

  res.status(200).json({ products, count: productCount });
};

// get all categories
const getAllCategories = async (req, res) => {
  const categories = await Product.find().distinct('category');

  if (!categories) {
    res.status(404).json({ error: 'No categories found' });
  }
  res.status(200).json(categories);
};

// get a specific product
const getProduct = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(404).json({ error: 'Product Does Not Exist. ID Error.' });
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).json({ error: 'Product Does Not Exist' });
  }

  res.status(200).json(product);
};

// get reviews for a specific product
const getReviewsForProduct = async (req, res) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(404).json({ error: 'Product Does Not Exist' });
  }

  const reviews = await Product.findById(productId).populate({ path: 'reviews', perDocumentLimit: 4 });
  if (!reviews) {
    res.status(404).json({ message: 'No Reviews' });
  }
  res.status(200).json(reviews);
};

// create a product
const createNewProduct = async (req, res) => {
  const { category, name, price, image } = req.body;

  try {
    const product = await Product.create({ category, name, price, image });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

// create a new review for a specific product
const createNewReviewForProduct = async (req, res) => {
  const { userName, text, rating, product } = req.body;

  try {
    const review = await Review.create({ userName, text, rating, product: mongoose.Types.ObjectId(product) });

    // this seems a bit odd? I would think theres a more streamlined way of adding the new review to the product
    const productToUpdate = await Product.findById(product);
    productToUpdate.reviews.push(review);
    productToUpdate.save();

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  res.json({ message: 'Delete Product' });
};

// create random data
const createRandomData = async (req, res) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';

    product.save((err) => {
      if (err) throw err;
    });
    res.end();
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getReviewsForProduct,
  createNewProduct,
  createNewReviewForProduct,
  deleteProduct,
  createRandomData,
  getAllCategories,
  deleteAllProducts,
};
