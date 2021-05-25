const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/products');
const Reviews = require('../models/reviews');

// gets product by product id
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

// posts the product to the database
router.post('/product', (req, res) => {
  const newProduct = new Product({
    category: req.body.catagory,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });
  console.log(req);
  newProduct.save((err) => err || console.log('Save is a Success'));
});

// deletes product by id
router.delete('/products/:productId', (req, res) => {
  const { productId } = req.params;

  Product.deleteOne({ _id: productId }, (err) =>
    err
      ? console.log(`Cast Error: No product with that ID`)
      : console.log('success')
  );
});

// posts a review to the product
router.post('/products/:product/reviews', (req, res) => {
  const reviewBody = req.body;
  const product = Product.findById(
    req.params.product,
    (err, productToReturn) => err || productToReturn
  );

  product.exec().then((product) => {
    const review = new Reviews({
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

// deletes a review by its id
router.delete('/reviews/:review', (req, res) => {
  Reviews.deleteOne({ _id: req.params.review }, (err) =>
    err
      ? console.log(`Cast Error: No review with that ID`)
      : console.log('success')
  );

  res.status(200).end();
});

// gets products based on parameters the route will look like
//   /products?page=3&category=games&sort=-1&name=anynameformat
router.get('/products', async (req, res) => {
  const perPage = 9;
  const page = req.query.page || 1;

  // pipeline optimazation for aggregation
  const getPaginationPipeline = (pageNo, pageSize) => [
    {
      // allows to create multiple aggregations within single stage
      $facet: {
        metadata: [
          // count of documents & adds more fields
          { $count: 'total' },
          { $addFields: { page: pageNo, limit: pageSize } },
        ],
        // pagination for total documents
        pageData: [
          { $skip: pageSize * pageNo - pageSize },
          { $limit: pageSize },
        ],
      },
    },
    {
      // passes specified requested fields to next stage
      $project: {
        pageData: 1,
        // the elements index
        page: { $arrayElemAt: ['$metadata.page', 0] },
        total: { $arrayElemAt: ['$metadata.total', 0] },
        limit: { $arrayElemAt: ['$metadata.limit', 0] },
        pages: {
          // gets smallest number then divides by pagesize
          $ceil: {
            $divide: [{ $arrayElemAt: ['$metadata.total', 0] }, pageSize],
          },
        },
      },
    },
  ];

  // collection aggreagation
  const products = await Product.aggregate([
    {
      // matches the name and category to to get the documents options makes them lowercase
      $match: {
        name: { $regex: req.query.name || '', $options: 'i' },
        category: { $regex: req.query.category || '', $options: 'i' },
      },
    },

    // sorts by passing 1 for ascending or -1 for descending
    {
      $sort: { price: Number(req.query.sort) || 1 },
    },
    // optimized pipeline stage
    ...getPaginationPipeline(page, perPage),
  ]).exec();

  res.status(200).send(products);
});

module.exports = router;

// // generates fake data
// router.get('/generate-fake-data', (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     const product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = 'https://via.placeholder.com/250?text=Product+Image';
//     product.reviews = [];

//     product.save((err) => {
//       if (err) throw err;
//     });
//   }
// });
