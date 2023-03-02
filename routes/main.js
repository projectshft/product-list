const router = require("express").Router();
const {faker} = require("@faker-js/faker");

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MyProductsSchema = new Schema({
  category: String,                          
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }]
});

ReviewSchema = new Schema({
  userName: String,
  reviewText: String,
  product: { type: Schema.Types.ObjectId, ref: 'myProducts'}
});

const MyProducts = mongoose.model('myProducts', MyProductsSchema);
const Review = mongoose.model('review', ReviewSchema);

//COUNT ALL PRODUCTS IN DATABASE 
MyProducts.count({}, ((err, count) => {
  console.log('Num products', count);
}));

//LOAD DB WITH FAKE DATA (commented out so code will not run)
// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let myProducts = new MyProducts();

//     myProducts.category = faker.commerce.department();
//     myProducts.name = faker.commerce.productName();
//     myProducts.price = faker.commerce.price();
//     myProducts.image = "https://via.placeholder.com/250?text=Product+Image";

//     myProducts.save((err) => {
//       if (err) throw err;
//     });
//   }
//   res.end();
// });

//CREATE GET ROUTE FOR PRODUCT BY PRODUCT ID (using req.query) //ROUTE SUCCESSFUL 
// router.get('/myProducts/:product', async (req, res) => {
//   const {selectedProductId} = req.query;
// try {
//   await MyProducts.findById({_id: selectedProductId})
//   res.status(200).send({'Product received': selectedProductId});
// } catch (err) {
//   console.log(err)
//     res.sendStatus(400)
// }
// });

//CREATE GET ROUTE FOR REVIEWS BY PRODUCT ID using path parameter    //ROUTE SUCCESSFUL 
// router.get('/myProducts/:product/reviews', async (req, res, next) => {         
//   const perProduct = 4;
//   const page = req.query.page || 1;  
//   const { selectedProductId } = req.query;
//   await MyProducts.findById({ _id: selectedProductId  })         
//   .skip(perProduct * page - perProduct)
//   .limit(perProduct)
//   .populate('reviews')
//   .exec((err, data) => {
//     if (err) return next (err)
//     res.send(data);
//   });
// });

//POST ROUTE TO ADD NEW PRODUCT TO DB   //ROUTE SUCCESSFUL
// router.post('/myProducts:', async (req, res) => {
//   await MyProducts.create({
//     category: req.body.category,
//     name: req.body.name,
//     price: req.body.price,
//     image: req.body.image,
//     reviews: [],
//   })
//   .then(result => {
//     res.send(result)
//   })
// });

//CREATE ROUTE TO ADD REVIEW TO PRODUCT BY PRODUCT ID   //ROUTE SUCCESSFUL
// router.post('/myProducts/:product/reviews', async (req, res, next) => {
//   let addReview = await new Review({
//     userName: req.body.userName,
//     reviewText: req.body.reviewText,
//     product: req.body.product
//   })
//   addReview.save();
//   const addReviewId = addReview._id
//   //console.log('addReviewId' + addReviewId)
//   const productId = req.body.product
//   //console.log('productId' + productId)
//   //const productId = '63c85f6b237dbf774bec7132';
  
//   const productToUpdate = await MyProducts.findById(productId)
//   productToUpdate.reviews.push(addReviewId)
//   productToUpdate.save((err, data) => {
//     if (err) return next (err);
//     res.send(data)
//   });
//   //console.log('reviews' + productToUpdate.reviews)
//  });

//DELETE PRODUCT BY PRODUCT ID  //ROUTE SUCCESSFUL
// router.delete('/myProducts/:product', (req, res, next) => {
//   MyProducts.findOneAndDelete({ _id: req.params.product })
//   .exec()
//   .then(() => res.status(200).json({ message: 'Product deleted' }))
//   .catch(err => res.status(500).json(err));
//   });

//DELETE REVIEW BY REVIEW ID   //ROUTE SUCCESSFUL 
// router.delete('/myProducts/reviews/:review', (req, res, next) => {
//   Review.findOneAndDelete({ _id: req.params.review })
//   .exec()
//   .then(() => res.status(200).json({ message: 'Review deleted' }))
//   .catch(err => res.status(500).json(err));
// });

//GET PRODUCTS BY QUERY & RENDER ALL IF NO QUERIES
router.get ("/myProducts", async (req, res, next) => {
  const perPage = 9;
  const page = req.query.page || 1;
  const { name, price, category, reset } = req.query
  const sortPrice = {}
  let results = {}

if (price) {
  price === 'Lowest' ? sortPrice.price = 'asc' : sortPrice.price = 'desc';
}
if (page > results.length) {
  results.page = 1
}
if (category){
  results.category = category
}
if(name) {     
  results.name = new RegExp (name, 'i')
}
if(reset) {
  results.reset = reset
}

await MyProducts.find(results)
    .sort(sortPrice)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, data) => {
        if (err) return next(err);
        res.send(data);
    });
  });

//FOR REFERENCE PURPOSES ONLY NOT REQUIRED BY EVAL 
// const newProduct = new MyProducts({     //id = 63feb1102781557679a51d69
//   category: 'Health',
//   name: 'Cool Purple Medicine Ball',
//   price: 25,
//   image: 'https://via.placeholder.com/250?text=Product+Image',
//   reviews: []})
//   .then(result => {
//     res.send(result);
//   });
//   //newProduct.save();
// //console.log('newProductId ' + newProduct._id);

//FOR REFERENCE PURPOSES ONLY, NOT REQUIRED BY EVAL 
//(commented out so code will not run) 
// MyProducts.create({           //SUCCESSFUL
//   category: 'Health',
//   name: 'Cool Purple Medicine Ball',
//   price: 25,
//   image: 'https://via.placeholder.com/250?text=Product+Image',
//   reviews: []})
//   .then(result => {
//     console.log(result);
//   });

//FOR REFERENCE PURPOSES ONLY 
//CREATE REVIEW FOR PRODUCT CREATED (newProductReview.product matches newProduct._id) //SUCCESSFUL
// const newProductReview = new Review({        
//   userName: 'Jillannette',
//   reviewText: 'Awesome product for the price!',
//   product: newProduct._id
// })
//   newProductReview.save();
//   console.log('newProductReview.product ' + newProductReview.product);
//   console.log('newProduct.reviews ' + newProduct.reviews)
//PUSH REVIEW TO PRODUCT.REVIEWS ARRAY (commented out so code will not run)(newProduct.reviews id is that of newProductReview._id))
//   result.reviews.push(newProductReview)
//   newProduct.save();

//**SAVE FOR TESTING  */
//Test finding product - product exists
// MyProducts.findOne({ _id: '63c177565a5cbb2634522d50'}, function (err, doc) {
//   console.log(doc)
// });

//***SAVE FOR TESTING  */
//Check if review exists 
// Review.findOne({ _id: '63c1d0e6e2159deef5255f51'}, function (err, doc) {
//   console.log(doc)
// });

module.exports = router;