const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = mongoose.module ('review', ReviewSchema )

const ReviewSchema = new schema({
  text: String,
  username: String,
});

const ReviewModel = mongoose.model("comment", commentSchema)

// const ReviewsSchema = new Schema({
//   userName: "string",
//   text: "string",
//   product: [{ type: Schema.Types.ObjectId, ref: 'product' }]
// })


// adding review to product
// book1.reviews.push(review);
// critic1.reviews.push(review);

// book1.save();
// critic1.save();


const ReviewModel = mongoose.model("review", reviewsSchema)





module.exports = mongoose.model('Review', ReviewSchema)