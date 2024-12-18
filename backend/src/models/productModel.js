const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : { type: String, require: true },
    sellerUsername : { type: String, require: true },
    price : { type: Number, require: true },
    desciption : { type: String },
});

productModel = mongoose.model('Product', productSchema);
module.exports = productModel;