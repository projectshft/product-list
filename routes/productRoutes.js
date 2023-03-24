const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");

router.get("/generate-fake-data", (req, res) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.save();
  }
  res.end();
});

router.get('/products', async (req, res) => {
  const page  = req.query.page || 1;
  const perPage = req.query.limit || 9;
  const skip = (page - 1) * perPage
  const count = await Product.countDocuments()
  const pageCount = Math.ceil(count / perPage);
  
  const { query, price, category } = req.query
  const sortPrice = {}
  const results = {}

  if (price) {
    if (price === 'Highest') {
      sortPrice.price = 'desc'
    } else if (price === 'Lowest') {
      sortPrice.price = 'asc';
    }
  } 

  if (category) {
    results.category = new RegExp (category, 'i')  
  }

  if (query) {
    results.name = new RegExp (query, 'i')  
  }

 const products = await Product.find(results)
  .sort(sortPrice)
  .skip(skip)
  .limit(perPage)
  .exec()

  res.json({
    pagination: {
      count, 
      pageCount, 
      perPage,
      page
    },
    data: products, 
  })
});

// get one product by id
router.get("/products/:product", getProduct, async (req, res) => {
  res.json(res.product)
})

// get all reviews for a product by id
router.get("/products/:product/reviews", getProduct, async (req, res) => {
  res.json(res.product.review)
})

// create one product
router.post('/products', async (req, res) => {
  const product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    review: req.body.review,
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// create one review in a product by id
router.post('/products/:product/reviews', async (req, res) => {
  try {
    let product = await Product.findById(req.params.product)
    product.review.push({userName: req.body.username, text: req.body.text})
    product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

// delete  one product by id
router.delete('/products/:product', getProduct, async (req, res) => {
  try {
    const removedProduct = await res.product.deleteOne()
    res.json(removedProduct)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// function to get product by id
async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.product)
    if (product == null) {
      return res.status(404).json({message: 'Cannot find product'})
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  res.product = product
  next()
}

module.exports = router;