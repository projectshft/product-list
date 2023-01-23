const router = require("express").Router();
const mongoose = require("mongoose");
const faker = require("faker");
const Product = require("../models/product");
const ProductSchema = require("../models/product");

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

// 1. Paginating GET route
router.get("/products", (req, res, next) => {
  Product.find((error, products) => {
    res.send(products);
  });
});

router.get("/products", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      Product.count().exec((err, count) => {
        if (err) return next(err);
        res.send(products);
      });
    });
  });

// PART 1 EVAL: CREATING ROUTES
// (1) Get a product by id (works)
router.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  // res.send(id);
  try {
    const product = await Product.findById(id);
    res.send('getting product:' + product)
  }
  catch (err) {
    console.error(err.message);
  }
})

// (2) Returns all reviews for a product, but limited to 4 at a time. 
router.get('/products/:product/reviews', (req, res) => { 
  Product.findById('63be0d90723243f762423c19', (err, data) => {
    if(err){
      console.log(err)
    } else {
      console.log(data)
      res.send(data)
    }
  })
})

// (3) Create a new product in the database (works)
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



// (5) Delete a product by its id (works)
router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    // console.log(deleteProduct);
    res.send('deleting product: ' + deleteProduct);
  } 
  catch (err) {
    // console.log(err.message);
    res.status(400).json({ message: err.message})
  }
})

// (6) Delete a review by product id



// Task 2 - Filter Category
router.get('/products?page=1&category=tools', (req, res) => {
  const filteredProduct = Product.find()


})


// Task 3 - Sorting by Price
router.get('/products?page=1&category=tools&price=highest', (req, res) => {

})


router.get('/products?page=1&category=tools&price=lowest', (req, res) => {})


// Task 4 - Searching
router.get('/products?query=shovel', (req, res) => {

})


module.exports = router;