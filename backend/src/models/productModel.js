const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id : { type: String, require: true, unique: true },
    name : { type: String, require: true },
    price : { type: Number, require: true },
    desciption : { type: String },
});

product = mongoose.model('Product', productSchema);
module.exports = product;