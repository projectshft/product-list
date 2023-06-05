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

router.get("/products", (req, res, next) => {
  const page = req.query.page || 1;
  const limit = 10;

  Product.find({})
    .skip(page * limit - limit)
    .limit(limit)
    .then((products) => {
      if (products.length === 0) {
        return res.status(404).send('No Products Found');
      }
      res.send(products);
    })
    .catch((error) => {
      console.log('Error:', error);
      res.status(500).send('An error occurred');
    });

});

router.get('/products/:product', (req, res) => {

  const productId = req.params.product;

  if(!productId) {
    res.status(400).send('Bad Request: Id is Invalid')
  }

  Product.findOne({_id: productId})
    .then((product) => {
      let productResult;

      productResult = product;

      if(!productResult) {
        return res.status(404).send("Product Not Found");
      }
      res.send(productResult)
    })
    .catch((error) => {
      console.log('Error:', error);
      res.status(500).send('Server is having trouble with your request');
    });
});

router.get('/products/:product/reviews', (req, res) => {
  const page = req.query.page || 1;
  const perPage = 4;
  const productId = req.params.product;

  if(!productId) {
    res.status(400).send('Bad Request: Id is Invalid')
  }

  Product.findOne({ _id: productId })
  .populate({path: 'reviews', options: {skip: page * perPage - perPage, limit: perPage}})
  .then((product) => {
    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.status(200).send(product.reviews);
  })
  .catch((error) => {
    console.log('Error:', error);
    res.status(500).send('Server is having trouble with your request');
  });

 
});

router.post('/products', (req, res) => {
  const newProductInfo = req.body;

  const productToAdd = new Product();

  productToAdd.category = newProductInfo.category
  productToAdd.name = newProductInfo.name
  productToAdd.price = newProductInfo.price
  productToAdd.image = newProductInfo.image
  productToAdd.reviews = [];
  
  productToAdd.save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct)
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('An error occurred while saving the product');
    });

});

router.post('/products/:product/reviews', (req, res) => {
  //create a new review from the request body
  // When it comes to the product put in the objectID
  //Send the review ObjectId to the Product which has been reviewed

  const newReviewInfo = req.body;
  const productId = req.params.product;

  let reviewToAdd = new Review();

  reviewToAdd.username = newReviewInfo.username;
  reviewToAdd.text = newReviewInfo.text;
  reviewToAdd.product = productId;

  reviewToAdd.save()
    .then((savedRev) => {
      Product.updateOne({_id: productId}, {$push: {reviews: savedRev._id}});
      res.status(201).json(savedRev);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).send('An error occurred while saving the product');
    });

});

router.delete('/products/:product', (req, res) => {
  const productId = req.params.product;

  Product.findOneAndDelete({_id: productId})
    .then((deletedProduct) => {
      if(!deletedProduct) {
        return res.status(404).send('Could not Find product to delete')
      }

    console.log('Document deleted:', deletedProduct);
      res.status(204).send(`${productId}, has been deleted`)
    })
});

router.delete('/reviews/:review', (req, res) => {
  const reviewId = req.params.product;

  Review.findOneAndDelete({_id: reviewId})
    .then((deletedReview) => {
      if(!deletedReview) {
        return res.status(404).send('Could not Find review to delete')
      }

    console.log('Document deleted:', deletedReview);
      res.status(204).send(`${reviewId}, has been deleted`)
    })
});



module.exports = router;