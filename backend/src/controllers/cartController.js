const cartModel = require('../models/cartModel');

const Cart = {};

Cart.addToCart = async function addProductToCart(req, res) {
    const { username, productID, quantity } = req.body;

    try {
        if (!username || !productID || !quantity) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingCart = await cartModel.findOne({ username });
        if (existingCart) {
            const updatedCart = await cartModel.findOneAndUpdate({ username }, { $push: { productID, quantity } }, { new: true });
            return res.status(201).json({ message: 'Product added to cart successfully!', cart: updatedCart });
        }

        console.log('Creating new cart...');

        const newCart = new cartModel({
            username,
            productID,
            quantity,
        });

        await newCart.save();

        res.status(201).json({ message: 'Product added to cart successfully!', cart: newCart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = Cart;