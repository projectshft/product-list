const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

// generate 90 fake data products for the database
router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";
    
    for (let j = 0; j < 6; j++) {
      let review = new Review({
        userName: faker.internet.userName(),        
        text: faker.lorem.paragraph(),
      });

      product.reviews.push(review);
      // comment out since database has enough fake data reviews
      // review.save();
    }

    // comment out since database has enough fake data products
    // product.save();
  }
  res.end();
});

// GET all the products but limit the display to load only 9 products at one time
router.get("/products", async (req, res, next) => {
  // set default to load first 9 products on page 1
  const page = req.query.page || 1; 
  const productsPerPage = 9;
  const startIndex = (page - 1) * productsPerPage;

  const category = req.query.category || null;
  const query = req.query.query || null;
  const price = req.query.price || null;

  const filterByCategory = () => {
    if (category) {
      return { category: { $regex: category, $options: "i" } };
    } else {
      return {};
    };
  };

  const filterByQuery = () => {
    if (query) {
      return { name: { $regex: query, $options: "i" } };
    } else {
      return {};
    };
  };

  const filterByPrice = () => {
    if (!price) {
      return {};
    } else if (price.toLowerCase() === "highest") {
        return { price: "desc" };
    } else if (price.toLowerCase() === "lowest") {
        return { price: "asc" };
    } 
  };

  try {
    const products = await Product.find()
      .sort(filterByPrice())
      .and([filterByCategory(), filterByQuery()])
      .skip(startIndex)
      .limit(productsPerPage)
      .exec();

      const count = await Product.find()
        .and([filterByCategory(), filterByQuery()])
        .countDocuments();
      const pageCount = Math.ceil(count / productsPerPage);

    res.send({
      products,
      totalNumberOfProducts: count,
      totalNumberOfPages: pageCount,
    });
  } catch (error) {
    if (error) return next (error);
  }
  
  res.end();
});

// GET a specific product by its id
router.get("/products/:product", async (req, res, next) => {
  try {
    const productById = await Product.findById(req.params.product);

    if (!productById) {
      return res
        .status(404)
        .send({ error: "404 No Product Found with that ID" });
    }

    res.status(200).send(productById);

  } catch (error) {
    if (error) return next (error);
  }
});

// GET All the reviews for a product, but limited to 4 at a time. 
router.get("/products/:product/reviews", async (req, res, next) => {
  try {
    const productReviewById = await Product.findById(req.params.product);

    if (!productReviewById) {
      return res
        .status(404)
        .send({ error: "404 No Product Reviews Found with that ID" });
    }
    const reviewsPerPage = 4;
    const page = req.query.page || 1; 
    const reviewStartIndex = (page - 1) * reviewsPerPage;
    const totalProductReviews = productReviewById.reviews.length;
    const pageCount = Math.ceil(totalProductReviews / reviewsPerPage);
    const reviewResults = productReviewById.reviews
      .slice(reviewStartIndex, reviewsPerPage);
    
    const reviewObject = {
      reviews: reviewResults,
      totalNumberOfPages: pageCount,
      totalNumberOfReviews: totalProductReviews,
    };

    res.status(200).send(reviewObject);
    
  } catch (error) {
    if (error) return next (error);
  }

  res.end();
});

// POST Creates a new product in the database
router.post("/products", async (req, res, next) => {
  try {
    const newProduct = new Product({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      reviews: [],
    });

    const saveNewProduct = await newProduct.save();
    res.status(201).send(saveNewProduct);
    
  } catch (error) {
    if (error) return next (error);
  }

  res.end();
});

// POST Creates a new review in the database by adding it to the correct product's reviews array
router.post("/products/:product/reviews", async (req, res, next) => {
  try {
    const productReviewById = await Product.findById(req.params.product);
    let newReviews = [productReviewById];

    const newProductReview = {
      userName: req.body.userName,
      text: req.body.text,
    };

    newReviews.push(newProductReview);
    newReviews.save();

    if (!productById) {
      return res
        .status(404)
        .send({ error: "404 No Product Found with that ID" });
    }

    res.status(201).send(newReviews);
    
  } catch (error) {
    if (error) return next (error);
  }

  res.end();
});

// DELETE Deletes a product by id
router.delete("/products/:product", async (req, res, next) => {
  try {
    const deleteProductById = await Product.findByIdAndDelete(req.params.product).exec();

    if(!deleteProductById) {
      return res
        .status(404)
        .send({ error: "404 No Product Found with that ID" });
    }

    res.status(200).send(deleteProductById);

  } catch (error) {
    if (error) return next (error);
  }

  res.end();
});

// DELETE Deletes a review by id
router.delete("/reviews/:review", async (req, res, next) => {
  try {
    const deleteReviewById = await Review.findByIdAndDelete(req.params.review).exec();

    if(!deleteReviewById) {
      return res
        .status(404)
        .send({ error: "404 No Product Found with that ID" });
    }

    res.status(200).send(deleteReviewById);

  } catch (error) {
    if (error) return next (error);
  }

  res.end();
});

module.exports = router;