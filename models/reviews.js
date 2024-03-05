const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userName: String,
  text: String,
  product: { type: Schema.Types.ObjectId, ref: 'Product' }
})

const Review = mongoose.model('Review', ReviewSchema)

const review = new Review({
  userName: 'John Doe',
  text: 'Great Product',
  product: '65bfda692aabd9d9dbade17d'
});

// review.save();



module.exports = mongoose.model('Review', ReviewSchema)