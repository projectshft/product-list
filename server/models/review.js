const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    userName: { type: String, required: true },
    text: { type: String, required: true },
    enabled: { type: Boolean, required: true },
    dateAdded: { type: Date, required: true },
    dateLastModified: { type: Date, required: true },
    product: { type: Schema.Types.ObjectId, res: 'Product' }
})

module.exports = mongoose.model( 'Review', ReviewSchema )