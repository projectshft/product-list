const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/products');
const Review = require('../models/reviews');

// generates fake data
router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    const product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = 'https://via.placeholder.com/250?text=Product+Image';
    product.reviews = [];

    product.save((err) => {
      if (err) throw err;
    });
  }
});

// gets product by product id but need to figure out error handling
router.get('/products/:productId', async (req, res) => {
  const passedInId = req.params.productId;

  const dbQuery = await Product.find(
    { _id: passedInId },
    (err, product) => err || product
  );
  res.json(dbQuery);
});

// gets the review for that product id
router.get('/products/:product/reviews', (req, res) => {
  Product.findOne({ _id: req.params.product })
    .populate('reviews')
    .exec((err, product) => {
      res.json(product);
    });
});

// posts the product to the database still have to figure error handling
router.post('/product', (req, res) => {
  const newProduct = new Product({
    category: req.body.catagory,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });

  newProduct.save((err) => err || console.log('Save is a  Success'));
});

// deletes product by id but what about more error handeling
router.delete('/products/:productId', (req, res) => {
  const { productId } = req.params;

  Product.deleteOne({ _id: productId }, (err) =>
    err
      ? console.log(`Cast Error: No product with that ID`)
      : console.log('success')
  );
});

// posts a review to the product sort of or i think
router.post('/products/:product/reviews', (req, res) => {
  const reviewBody = req.body;
  const product = Product.findById(
    req.params.product,
    (err, productToReturn) => err || productToReturn
  );

  product.exec().then((product) => {
    const review = new Review({
      userName: reviewBody.userName,
      text: reviewBody.text,
      productId: product._id,
    });
    review.save();
    product.reviews.push(review);
    product.save();
    res.json([product, review]);
  });
});

// gets products based on parameters the route will look like
//   /products?page=3&category=games&price=desc or asc
router.get('/products', async (req, res) => {
  const perPage = 9;
  const page = Math.max(0, req.query.page) || 1;

  const getPaginationPipeline = (pageNo, pageSize) => [
    {
      $facet: {
        metadata: [
          { $count: 'total' },
          { $addFields: { page: pageNo, limit: pageSize } },
        ],
        pageData: [
          { $skip: pageSize * pageNo - pageSize },
          { $limit: pageSize },
        ],
      },
    },
    {
      $project: {
        pageData: 1,
        page: { $arrayElemAt: ['$metadata.page', 0] },
        total: { $arrayElemAt: ['$metadata.total', 0] },
        limit: { $arrayElemAt: ['$metadata.limit', 0] },
        pages: {
          $ceil: {
            $divide: [{ $arrayElemAt: ['$metadata.total', 0] }, pageSize],
          },
        },
      },
    },
  ];

  const products = await Product.aggregate([
    {
      $match: {
        name: { $regex: req.query.name || '', $options: 'i' },
        category: { $regex: req.query.category || '', $options: 'i' },
      },
    },
    { $sort: { price: Number(req.query.sort) || 1 } },
    ...getPaginationPipeline(page, perPage),
  ]).exec();

  res.status(200).send(products);
});

module.exports = router;
