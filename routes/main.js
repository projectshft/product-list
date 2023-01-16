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



//1. //LOAD DB WITH FAKE DATA = DONE
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

//2. IMPLEMENT PAGINATION = DONE
router.get("/myProducts", (req, res, next) => {
  const perPage = 9;

  // return the first page by default
  const page = req.query.page || 1;

  MyProducts.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, myProducts) => {
      // Note that we're not sending `count` back at the moment, but in the future we might want to know how many are coming back so we can figure out the number of pages
      MyProducts.count().exec((err, count) => {
        if (err) return next(err);

        res.send(myProducts);
        });
        //console.log(myProducts)
    });
})

//3. CREATE NEW PRODUCT = DONE
// const newProduct = new MyProducts({
//   category: 'Health',
//   name: 'Cool Purple Medicine Ball',
//   price: 25,
//   image: 'https://via.placeholder.com/250?text=Product+Image',
//   reviews: [],
// })
// console.log('newProductId ' + newProduct._id);

//4. CREATE REVIEW FOR PRODUCT CREATED = DONE - (newProductReview.product matches newProduct._id)
// const newProductReview = new Review({
//   userName: 'Jillannette',
//   reviewText: 'Awesome product for the price!',
//   product: newProduct._id
// })
//newProductReview.save();
// console.log('newProductReview.product ' + newProductReview.product);
// console.log('newProduct.reviews ' + newProduct.reviews)

//5. PUSH REVIEW TO PRODUCT.REVIEWS ARRAY = DONE (newProduct.reviews id is that of newProductReview._id))
//newProduct.reviews.push(newProductReview)
//newProduct.save();

//****1/15 START HERE!!!!!*****  create dynamic route for adding new product 

//6. CREATE POST ROUTE FOR ADDING A NEW PRODUCT TO DB

// router.post('/myProducts', (req, res) => {
//   const newProduct = new MyProducts({   
//     category: req.param.category,   ???? CHECK THESE 
//     name: req.param.name,
//     price: req.param.price,
//     image: req.param.image,
//     reviews: [],
//   })
//   console.log('newProductId ' + newProduct._id);
//   newProduct.save()
// .then(newProduct => {
//   res.send('newProduct saved to DB');
//   console.log(newProduct)
// })
// .catch (err => {
//   res.status(400).send('unable to save newProduct to DB');
// });
//});

//7. CREATE ROUTE TO ADD REVIEW TO CERTAIN PRODUCT BY ID
//router.post('/myProducts/:product/reviews', (req, res) => {
// router.param(req.param._id, req.param.reviews)  ?????? double check this!!! s/b req.param._id, req.param.reviews??
//const newProductReview = new Review({
  //userName: req.param.userName,
  //reviewText: req.param.reviewText,
  //product: req.param._id
//});

//NEED TO WRITE A FUNCTION TO PUSH NEW REVIEWS TO PRODUCT REVIEWS ARRAY???  
//newProductReview.save() //Successfully saved newProductReview WITH newProduct _id in product field
// .then(newProductReview => {
//   res.send('newProductReview saved to DB');
//   console.log(newProductReview)
// })
// .catch (err => {
//   res.status(400).send('unable to save newProductReview to DB');
// });

//**SAVE FOR LATER USE  */
//Delete original product so can refactor population changes - successfully deleted newProduct
// MyProducts.findOneAndDelete({ _id: '63c583c700d1ec838197c5d6'}, (err, newProduct) => {
//   if (err) console.log(err) 
//   console.log(newProduct)
// });

//****SAVE FOR LATER USE, CREATE ROUTE FOR DELETING ITEMS FROM DB */
//Delete original review so can refactor population changes - successfully deleted newProductReview
// Review.findOneAndDelete({_id: '63c583c700d1ec838197c5d7'}, (err, newProductReview) => {
//   if (err) console.log(err)
//   console.log(newProductReview)
// });
 
//*****SAVE FOR LATER USE, GET PRODUCT BY PRODUCT ID */
// router.get('myProducts/:product', (req, res) => {
//   const product = req.query.product;
//   cnsole.log(req.query.product);
//   res.send('response send to client::'+req.query.product);
// });

//***SAVE FOR LATER USE  */   ????
//Create GET route for product by product ID
// router.get('/myProducts/:product', (req, res) => {
//   const { product } = req.params;
//   const myProducts = myProducts.find(myProducts =>myProducts.id == product
//);
//   res.json(req.params);
//   console.log(res.json)
//   res.end();
// });

//**SAVE FOR TESTING  */
//Test finding product - product exists
// MyProducts.findOne({ _id: '63c177565a5cbb2634522d50'}, function (err, doc) {
//   console.log(doc)
// });

//**SAVE FOR LATER USE */
// Review.findOneAndDelete({_id: '3c56cd68dcc1aa85172e2c7'}, (err, newProductReview) => {
//   if (err) console.log(err)
//   console.log(newProductReview)
// });

//***SAVE FOR LATER TESTING  */
//Check if review exists 
// Review.findOne({ _id: '63c1d0e6e2159deef5255f51'}, function (err, doc) {
//   console.log(doc)
// });





module.exports = router;
