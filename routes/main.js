const router = require("express").Router();
const {faker} = require("@faker-js/faker");
const {Product, Review} = require("../models/product");

//generates fake data
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();
    
    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();

    let review = new Review({
      userName: faker.name.fullName(),
      text: faker.lorem.lines(1),
    });

    product.reviews = [review];
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save();
  }
  res.end();
});


//Get all products
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


//Get products by a specific ID
router.get("/products/:product", async (req, res, next) => {
  try {
    const prodId = await Product.findById(req.params.product);
    if (!prodId) {
      return res
        .status(404)
        .send({error: "404: No product found"});
    }
    res.send(prodId);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: "error has occured"});
  }
});

//Get reviews for specific products
router.get("/products/:product/reviews", async (req, res, next) => {
  try {
    const prodById = await Product.findById(req.params.product);
    if (!prodById) {
      return res
        .status(404)
        .send({error: "404: No product found"});
    }
    const result = prodById.reviews;
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: "Error Occured"});
  }
});

//Create product
router.post('/products', async (req, res) => {
  const product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    reviews: req.body.review,
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    console.log(err);
    res.status(500).send({error: "Error Occured"});
  }
})

//Create review
router.post("/products/:product/reviews", async (req, res, next) => {
  try {
    const prodReview = await Product.findById(req.params.product);
    let reviews = [prodReview]
    reviews.push({userName: req.body.username, text: req.body.text})
    reviews.save()
    res.status(201).json(reviews)
    if (!prodReview) {
      return res
        .status(404)
        .send({error: "404: No product found"});
    }
    res.send(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).send({error: "error has occured"});
  }
});

//Deletes a product
router.delete('/products/:product', async (req, res) => {
  try {
    const removedProduct = await res.product.deleteOne()
    res.json(removedProduct)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

//Deletes a review
router.delete('/reviews/:review', async (req, res) => {
  try {
    const removedReview = await res.Review.deleteOne()
    res.json(removedReview)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

module.exports = router;