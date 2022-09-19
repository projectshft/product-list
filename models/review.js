const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    userName: String,
    text: String,
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  {
    collation: { locale: 'en', strength: 2 },
  }
);
ReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Review', ReviewSchema);
