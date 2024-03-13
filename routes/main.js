const router = require("express").Router();
const faker = require("faker");
const { Product, Review } = require("../models/product");

/**
 * Generates fake data for database
 */
router.get("/generate-fake-data", async (req, res, next) => {
  try {
    for (let i = 0; i < 90; i++) {
      let product = new Product();

      product.category = faker.commerce.department();
      product.name = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.image = "https://via.placeholder.com/250?text=Product+Image";

      await product.save();
    }
    res.end();
  } catch (err) {
    next(err);
  }
});

/*
 * GET products route
 */
router.get("/products", async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const category = req.query.category;
  const price = req.query.price;
  const query = req.query.query;

  try {

    let categoryQuery = {};

    if (category) {
      categoryQuery = { category: new RegExp(category, 'i') };
    }

    let sortPriceQuery = {};

    if (price) {
      if (price === 'highest') {
        sortPriceQuery = { price: -1 };
      } else if (price === 'lowest') {
        sortPriceQuery = { price: 1 };
      }
    }

    let searchQuery = {};

    if (query) {
      searchQuery = { name: new RegExp(query, 'i') };
    }

    const searchQueryAndCategoryQuery = {
      ...categoryQuery,
      ...searchQuery,
    };
    
    
    const products = await Product.find(searchQueryAndCategoryQuery)
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort(sortPriceQuery)
        .exec();

    const count = await Product.countDocuments(searchQueryAndCategoryQuery);

    const result = {
      products: products,
      count: count,
    }

      res.send(result);
  } catch (err) {
      next(err);
  }
});

/*
 * GET products by product ID route
 */
router.get("/products/:product", async (req, res) => {
  const productId = req.params.product;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

/*
 * GET product reviews by product ID route
 */
router.get("/products/:product/reviews", async (req, res) => {
  const productId = req.params.product;
  const perPage = 4;
  const page = req.query.page || 1;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = await Review.find({ product: productId })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    res.json(reviews);
  } catch (err) {
    next(err);
  }  
});

/*
 * POST products to the store
 */
router.post("/products", async (req, res) => {
  try {
    const {category, name, price, image} = req.body;

    if (!category || !name || !price || !image) {
      return res.status(400).json({ message: 'All fields are required to add a product'});
    }

    const newProduct = new Product({
      category,
      name,
      price,
      image
    });

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (err) {
    next(err);
  }
});

/*
 * POST product reviews by product ID
 */
router.post("/products/:product/reviews", async (req, res) => {
  const productId = req.params.product;

  try {
    const {userName, text} = req.body;

    if (!userName || !text) {
      res.status(400).json({ message: "All fields are required to leave a review"});
    }

    const newReview = new Review({
      userName,
      text,
      product: productId
    });

    await newReview.save();

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }    

    product.reviews.push(newReview);
    await product.save();    

    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

/*
 * DELETE products by product ID
 */
router.delete("/products/:product", async (req, res) => {
  const productId = req.params.product;

  try {
    const productToDelete = await Product.findByIdAndDelete(productId);

    if (!productToDelete) {
      return res.status(400).json({ message: "Found no product to delete" });
    }

    await Review.deleteMany({ product: productId });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
});

/*
 * DELETE review by review ID
 */
router.delete("/reviews/:review", async (req, res) => {
  const reviewId = req.params.review;

  try {
    const reviewToDelete = await Review.findByIdAndDelete(reviewId);

    if (!reviewToDelete) {
      return res.status(400).json({ message: "Found no review to delete" });
    }

    const productToUpdate = await Product.updateOne(
      { reviews: reviewId },
      { $pull: { reviews: reviewId } }
    );

    if (!productToUpdate) {
      return res.status(400).json({ message: "Product not found"})
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
})

module.exports = router;
