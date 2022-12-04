const Product = require('../models/productsModel')
const mongoose = require('mongoose')

//get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json(products)
}

// get a specific product
const getProduct = async (req, res) => {
  const {id} = req.body
  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({error: 'Product Does Not Exist'})
  }

  const product = await Product.findById(id)
  if(!product) {
    res.status(404).json({error: 'Product Does Not Exist'})
  }

  res.status(200).json(product)
}


// get reviews for a specific product
const getReviewsForProduct = async (req, res) => {
  const {id} = req.body
  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({error: 'Product Does Not Exist'})
  }

  const reviews = await Product.findById(id).populate('reviews')
  if(!reviews) {
    res.status(404).json({message: "No Reviews"})
  }
  res.status(200).json(reviews)
}

// create a product
const createNewProduct = async (req, res) => {
  const {category, name, price, image} = req.body

  try {
    const product = await Product.create({category, name, price, image});
    res.status(200).json(product)
  } catch(err) {
    res.status(404).json({message: err})
  }
}

// create a new review for a specific product
const createNewReviewForProduct = async (req, res) => {
  
}

// delete a product 
const deleteProduct = async (req, res) => {

} 


module.exports = {getAllProducts, getProduct, getReviewsForProduct, createNewProduct, createNewReviewForProduct, deleteProduct}