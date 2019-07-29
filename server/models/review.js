const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema;

//The ReviewSchema contains an enabled property which defaults to "true", but will be changed to "false" when its delete route is accessed and that review will no longer be sent back with get requests.
const ReviewSchema = new Schema({
    userName: { type: String, required: true },
    text: { type: String, required: true },
    enabled: { type: Boolean, required: true },
    dateAdded: { type: Date, required: true },
    dateLastModified: { type: Date, required: true },
    product: { type: Schema.Types.ObjectId, res: 'Product' }
})

module.exports = mongoose.model( 'Review', ReviewSchema )