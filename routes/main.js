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

router.get("/products", async (req, res) => {
  const perPage = 9
  const page = req.query.page || '1'
  const queryParameter = req.query
  
  if (queryParameter.price === 'highest' && queryParameter.category && queryParameter.query) {
    try {
      const products = await Product
        .find({category: queryParameter.query})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({'price': - 1})
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.price === 'lowest' && queryParameter.category && queryParameter.query) {
    try {
      const products = await Product
        .find({category: queryParameter.query})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({'price': 1})
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.price === "highest" && queryParameter.category) {
    try {
      const products = await Product
        .find({category: queryParameter.category})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({'price': - 1})
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.price === "lowest" && queryParameter.category) {
    try {
      const products = await Product
        .find({category: queryParameter.category})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({'price': 1})
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.price === 'highest' &&  queryParameter.query) {
    try {
      const products = await Product
        .find({ $or :[
        {name: queryParameter.query}, 
        {category: queryParameter.query}
      ]})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({'price': - 1})
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } if (queryParameter.price === 'lowest' &&  queryParameter.query) {
    try {
      const products = await Product
        .find({ $or :[
        {name: queryParameter.query}, 
        {category: queryParameter.query}
      ]})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({'price': 1})
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.category && queryParameter.query) {
    try {
      const products = await Product
        .find({category: queryParameter.query})
        .skip(perPage * page - perPage)
        .limit(perPage)
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.query) {
    try {
      const products = await Product
          .find({ $or :[
          {name: queryParameter.query}, 
          {category: queryParameter.query}
        ]})
        .skip(perPage * page - perPage)
        .limit(perPage)
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.price === "lowest") {
    try {
      const products = await Product
        .find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({'price': 1})
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.price === "highest") {
    try {
      const products = await Product
        .find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({'price': - 1})
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else if (queryParameter.category) {
    try {
      const products = await Product
        .find({category: queryParameter.category})
        .skip(perPage * page - perPage)
        .limit(perPage)
      res.json(products)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else {
    try {
      const total = await Product.countDocuments({})
      const products = await Product
        .find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
      res.json({
        totalPages: Math.ceil(total / perPage),
        products
      })
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }
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