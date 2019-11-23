const mongoose = require('mongoose')
const Schema = mongoose.Schema

//The Schema that our new reviews use 
const ReviewSchema = new Schema({
    username: String,
    text: String,
    product: { type: Schema.Types.ObjectId, ref: 'Product' }
});


module.exports = mongoose.model('Review', ReviewSchema);
