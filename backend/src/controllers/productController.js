const productModel = require('../models/productModel');

const Product = {};

Product.getAllProducts = async function getAllProducts(req, res) {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = Product;