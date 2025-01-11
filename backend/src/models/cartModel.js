const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true, unique: true },
    username : { type: String, require: true, unique: true },
    productID : { type: Array, require: true },
    quantity : { type: Array, require: true },
});

cartModel = mongoose.model('Cart', cartSchema);
module.exports = cartModel; 