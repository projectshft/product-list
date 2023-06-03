const mongoose = require('mongoose'); 

mongoose.connect("mongodb://127.0.0.1/productsDB");

const Schema = mongoose.Schema; 


const productSchema = new Schema ({
    name : String, 
    price : Number, 
    category : String, 
    //refers to the Review model, does not store the reviews themselves just the ids
    reviews : [{type: Schema.Types.ObjectId, ref:'review'}], 

}); 

const Product = mongoose.model('product', productSchema); 

const reviewSchema = new Schema ({
    username : String, 
    text : String, 
    productId : {type: Schema.Types.ObjectId, ref:'product'}
}); 

const Review = mongoose.model('review', reviewSchema); 

let hat = new Product ({
    name : 'sun hat', 
    price : 10, 
    category : 'acessory',
    reviews : [],
    //_id: String,
});

let hatReview = new Review ({
    username : 'Lisa', 
    text : 'The hat is great', 
    productId: []
})

//hatReview.save(); 
//hat.reviews.push(hatReview)
//hat.save(); 

module.exports = {
    Product: Product,
    Review: Review
  };
  

// Product.findOne({ name : 'sun hat' })
//   .populate("reviews")
//   .exec()
//   .then(product => {
//     console.log('Product with populated reviews:', product);
//   })
//   .catch(error => {
//     console.error('Error querying product:', error);
//   })