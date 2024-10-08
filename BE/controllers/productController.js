const Product = require('../models/product');

// Get all products with pagination, filtering, and sorting
const getAllProducts = async (req, res) => {
  const { page = 1, limit = 9, category = 'all', sort = 'asc' } = req.query;

  const query = {};
  // Filter by category if not 'all'
  if (category && category !== 'all') {
    query.category = category;
  }

  try {
    // Get total count of products for pagination
    const totalProducts = await Product.countDocuments(query);
    
    // Calculate the number of products to skip
    const skip = (page - 1) * limit;
    
    // Fetch the products from the database
    const products = await Product.find(query)
      .sort({ price: sort === 'asc' ? 1 : -1 }) // Sort by price
      .skip(skip) // Skip the appropriate number of products
      .limit(parseInt(limit)); // Limit the number of results
    
    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    // Send the response
    res.json({
      products,
      totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products.' });
  }
};


// Get a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product.' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { userName, name, description, price, category, image } = req.body;

  if (!userName || !name || !description || !price || !category || !image) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newProduct = new Product({
      userName,
      name,
      description,
      price,
      category,
      image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product.' });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { userName, name, description, price, category, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { userName, name, description, price, category, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product.' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product.' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
