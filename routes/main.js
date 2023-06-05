const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    product.reviews = [];

    product.save();
  }
  res.end();
});

router.get('/generate-fake-reviews', (req, res) => {
  Product.find({})
  .exec().then((products) => {
    let idArray = [];

    products.forEach((product) => {
     idArray.push(product._id);
    });

    createReviews(idArray);
  });

  
  const createReviews = async (arr) => {
    let productIds = arr;

    for (let i = 0; i < 180; i++) {
      const review = new Review();

      let randomIndex = Math.floor(Math.random() * 90);
      let productId = productIds[randomIndex];

      review.username = faker.lorem.word();
      review.text = faker.lorem.sentence();
      review.product = productId

      await review.save();

      await Product.updateOne({_id: productId}, {$push: {reviews: review._id}});
    }

    res.end();
}

});

router.get("/reviews", (req, res, next) => {
  Review.find({})
    .exec().then((reviews) => {
      res.send(reviews);
    });

});

router.get("/products", async (req, res, next) => {
  try{
    const page = req.query.page || 1;
    const queryCategory = req.query.category
    const perPage = 10;

    const category = queryCategory.charAt(0).toUpperCase() + queryCategory.slice(1);
    const query = category ? { category } : {}

    const products = await Product.find(query)
      .skip((page-1) * perPage)
      .limit(perPage)

      if (products.length === 0) {
        return res.status(404).send('No Products Found');
      }
      
      res.status(200).send(products);
      
  } catch(error) {
    console.log('Error:', error);
    res.status(500).send('An error occurred');
  };
});

router.get('/products/:product', async (req, res) => {
  try{
    const productId = req.params.product;

    if(!productId) {
      res.status(400).send('Bad Request: Id is Invalid')
    }

    const product = await Product.findOne({_id: productId});
      
    if(!product) {
      return res.status(404).send("Product Not Found");
    }

    res.status(200).send(product);

  } catch(error) {
    res.status(500).send('Server is having trouble with your request');
  };    
});

router.get('/products/:product/reviews', async (req, res) => {
  try{
    const page = req.query.page || 1;
    const perPage = 4;
    const productId = req.params.product;

    if(!productId) {
      res.status(400).send('Bad Request: Id is Invalid')
    }

    const populateProductRev = await Product.findOne({ _id: productId })
    .populate({path: 'reviews', options: {skip: page * perPage - perPage, limit: perPage}})

    if (!populateProductRev) {
      return res.status(404).send('Product not found');
    } 

    res.status(200).send(populateProductRev.reviews);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Server is having trouble with your request');
  };
});

router.post('/products', async (req, res) => {
  try{
    const newProductInfo = req.body;

    Object.getOwnPropertyNames(newProductInfo).forEach((property) => {
      if(!newProductInfo[property]) {
        res.status(400).send('All fields are required when making a new product');
      }
    });

    const productToAdd = new Product({
      category: newProductInfo.category,
      name: newProductInfo.name,
      price: newProductInfo.price,
      image: newProductInfo.image,
      reviews: []
    });
    
    const savedProduct = await productToAdd.save();
    
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while saving the review');
  }
  

});

router.post('/products/:product/reviews', async (req, res) => {

  try{
    const newReviewInfo = req.body;
    const productId = req.params.product;
  
    Object.getOwnPropertyNames(newReviewInfo).forEach((property) => {
      if(!newReviewInfo[property]) {
        res.status(400).send('All fields are required when making a new Review');
      }
    });

    
    const verifyProductId = await Product.findOne({_id: productId});

    if (!verifyProductId) {
      return res.status(404).send('Product not found, unable to attach review');
    }

    let reviewToAdd = new Review({
      username: newReviewInfo.username,
      text: newReviewInfo.text,
      product: productId
    });

    const savedRev = await reviewToAdd.save();

    await Product.updateOne({_id: productId}, {$push: {reviews: savedRev._id}});
    res.status(201).json(savedRev);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while saving the review');
  }
   
        
});

router.delete('/products/:product', async (req, res) => {
  try {
    const productId = req.params.product;

    const deletedProduct = await Product.findOneAndDelete({_id: productId});

    if(!deletedProduct) {
      return res.status(404).send('Could not Find product to delete');
    }

    res.status(204).send(`${productId}, has been deleted`);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while saving the review');
  }
  
});

router.delete('/reviews/:review', async (req, res) => {
  try {
    const reviewId = req.params.review;

    const deletedReview = await Product.findOneAndDelete({_id: reviewId});

    if(!deletedReview) {
      return res.status(404).send('Could not Find product to delete');
    }

    res.status(204).send(`${reviewId}, has been deleted`);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while saving the review');
  }
});



module.exports = router;