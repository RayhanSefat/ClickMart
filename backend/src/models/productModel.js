const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true, unique: true },
    name : { type: String, require: true },
    sellerUsername : { type: String, require: true },
    description : { type: String },
    price : { type: Number, require: true },
    category : { type: String },
    imagePath : { type: String },
});

productModel = mongoose.model('Product', productSchema);
module.exports = productModel;