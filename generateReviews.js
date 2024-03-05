const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('./models/product')
const Review = require('./models/reviews');

mongoose.connect('mongodb://localhost:27017/products');
//This was used to generate reviews for the products in the database
const generateFakeReview = () => {
  return {
    userName: faker.person.fullName(),
    text: faker.lorem.sentences()
  };
};

const addReviewToProducts = async () => {
  try {
    const products = await Product.find();
    for (const product of products) {
      const fakeReview = generateFakeReview();
      const review = new Review({ ...fakeReview, product: product._id });
      await review.save();

      product.reviews.push(review);
      await product.save();
    }
    console.log('Reviews added to all products')
  } catch (error) {
    console.error("Error adding reviews to products", error)
  }
};

addReviewToProducts()
  .then(() => mongoose.disconnect)