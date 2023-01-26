const router = require("express").Router();
const mongoose = require("mongoose");
const faker = require("faker");
const Product = require("../models/product");
const ProductSchema = require("../models/product");
const { query } = require("express");
const product = require("../models/product");
const { json } = require("body-parser");

mongoose.set('strictQuery', false);

router.get('/', (req, res, next) => {
  res.send('NodeJS listening on port 3000');
})

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end('Connected!');
});

// 1. Filter results by category, name and sort by price
router.get('/products', (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;

  const { name, price, category } = req.query
  const sortPrice = {}
  const results = {}
  
  price === 'lowest' ? sortPrice.price = 'asc' : sortPrice.price = 'desc';

  if(category){
    results.category = new RegExp (category, 'i')  
  }

  if(name){
    // results.name = new RegExp (name, 'i')  
    // Product.find({name: { "$regex": name, "$options": "i" }})
    Product.find({name: new RegExp(name, 'i')})
  }

  Product.find(results)
    .sort(sortPrice)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments(results).exec((err, count) => {
        if (err) return next(err);
        res.send({ count, products });
      });
    });
  });
    
// (1) Get a product by id 
router.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  // console.log(id);  res.send(id);
  try {
    const product = await Product.findById(id);
    res.send('getting product:' + product)
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ err:true, message: 'Internal Server Error' });
  }
})

// (2) Returns all reviews for a product, but limited to 4 at a time.Example productID = 63be0d90723243f762423c17
router.get('/products/:product/reviews', async (req, res) => { 
  const perPage = 4;
  const page = req.query.page || 1;

  const id = req.params.product;
  console.log(req.params.product)
  try {
    const product = await Product.findById(id); 
    res.send('getting reviews for product ' + product.reviews);
  }
  catch (err) {
    console.log(err.message);
  }
})

// (3) Create a new product in the database 
router.post('/products', async (req, res) => {
  const data = new ProductSchema ({ 
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
  })
  try{
    const newProduct = await data.save();
    res.status(200).json('new product created:' + newProduct);
  }
  catch(err){
    res.status(400).json({message: err.message})
  }
})

// (4) Create a new review by adding it to the correct product's reviews array.
router.post('/products/:product/reviews', async (req, res) => {
  const review = req.body
  console.log(req.body)
  const findProduct = await Product.findById(req.params.product); 
  const hasReview = findProduct.hasOwnProperty('reviews');
   
  if (hasReview) {
    // add reviews to product
    findProduct.reviews.push(review); 
    await findProduct.save() 
    res.end();
  } else {
    // add field of review to product and add put reviews in array
    findProduct.reviews = [review];
    await findProduct.save()
    res.end();
  } 
})

// (5) Delete a product by its id 
router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    res.send('deleting product: ' + deleteProduct);
  } 
  catch (err) {
    res.status(400).json({ message: err.message})
  }
})

// (6) Delete the review field by product id
router.delete('/products/:id/reviews', async (req, res) => {
  const productId = req.params.id
  try {
    const findProduct = await Product.findById(productId);
    console.log(findProduct)
    const deleteReview = await findProduct.update(
      { id: req.params.productID },
      console.log(id),
      { $unset: {"reviews": ""}});
      res.send('deleting review: ' + deleteReview)
    } catch(err){
      res.status(400).json({ message: err.message})
    }
  })

module.exports = router;