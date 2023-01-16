const router = require("express").Router();
const {faker} = require("@faker-js/faker");

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MyProductsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});

ReviewSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userName: String,
  reviewText: String,
  product: { type: Schema.Types.ObjectId, ref: 'MyProducts'}
});

const MyProducts = mongoose.model('MyProducts', MyProductsSchema);
const Review = mongoose.model('Review', ReviewSchema);



//LOAD DB WITH FAKE DATA = DONE
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

//IMPLEMENT PAGINATION = DONE
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

//CREATE NEW PRODUCT = DONE
router.post('/myProducts', (req, res) => {
const newProduct = new MyProducts({
  category: 'Health',
  name: 'Cool Purple Medicine Ball',
  price: 25,
  image: 'https://via.placeholder.com/250?text=Product+Image',
  reviews: [],
})
});

// // newProduct.save()
// // .then(product => {
// //   res.send('product saved to db');
// // })
// // .catch(err => {
// //   res.status(400).send('unale to save to database');
// // });
// });

//Delete original product so can refactor population changes - successfully deleted newProduct
// MyProducts.findOneAndDelete({ _id: '63c177565a5cbb2634522d50'}, (err, newProduct) => {
//   if (err) console.log(err) 
//   console.log(newProduct)
// });

//Delete original review so can refactor population changes - successfully deleted newProductReview
// Review.findOneAndDelete({_id: '63c1d0e6e2159deef5255f51'}, (err, newProductReview) => {
//   if (err) console.log(err)
//   console.log(newProductReview)
// });
 

// router.get('myProducts/:product', (req, res) => {
//   const product = req.query.product;
//   cnsole.log(req.query.product);
//   res.send('response send to client::'+req.query.product);
// });

//Create GET route for product by product ID

// router.get('/myProducts/:product', (req, res) => {
//   const { product } = req.params;
//   const myProducts = myProducts.find(myProducts =>myProducts.id == product
//);
//   res.json(req.params);
//   console.log(res.json)
//   res.end();
// });


//Test finding product - product exists
// MyProducts.findOne({ _id: '63c177565a5cbb2634522d50'}, function (err, doc) {
//   console.log(doc)
// });

// //CREATE PRODUCT REVIEW = DONE & VERIFIED IN MONGODB COMPASS
// router.post('/myProducts/:product/reviews', (req, res) => {
// const { product } = req.params;   
// const newProductReview = new Review({
//   userName: 'Jillannette',
//   reviewText: 'Awesome product!',
//   reviewedProduct: product._id
  
// })
// newProductReview.save()
//   res.send('review saved to db');
//   product.reviews.push(newProductReview)
//   product.save()
//   console.log(newProductReview)
//});

//Check if review exists 
// Review.findOne({ _id: '63c1d0e6e2159deef5255f51'}, function (err, doc) {
//   console.log(doc)
// });



//***START HERE*** Object Ids are not making it into respective fields:  */
//review Object Id is not making it into newProduct reviews field
//product Object Id is not making it into newProductReview product field.  
//double check the method, something is off.  Code below DOES NOT WORK.

// MyProducts.findOne({ name: 'Cool Purple Medicine Ball'})
// .populate('reviews')
// .exec(function (err, myProducts) {
//   if (err) 
//   console.log(myProducts)
// });

module.exports = router;