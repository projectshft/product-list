const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: String,
  name: String,
  price: Number,
  image: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  updated_at: Date,
  created_at: Date
});

// ProductSchema.pre('create', function (next) {
//   // get the current date
//   const currentDate = new Date();

//   // change the updated_at field to current date
//   this.updated_at = currentDate;
//   // if created_at doesn't exist, add to that field
//   if (!this.created_at) {
//     this.created_at = currentDate;
//   }
//   next();
// });

ProductSchema.pre('save', function (next) {
  // get the current date
  const currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

ProductSchema.index({ name: 'text', 'name': 'text' });

module.exports = mongoose.model('Product', ProductSchema);