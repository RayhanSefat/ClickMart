const cartModel = require("../models/cartModel");

const Cart = {};

Cart.addToCart = async function addProductToCart(req, res) {
  const { username, productID, quantity } = req.body;

  try {
    // console.log(username, productID, quantity);

    if (!username || !productID || !quantity) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingCart = await cartModel.findOne({ username });
    if (existingCart) {
      const productIndex = existingCart.productID.findIndex(
        (id) => id === productID
      );
      if (productIndex !== -1) {
        existingCart.quantity[productIndex] += quantity;
        await existingCart.save();
        return res
          .status(200)
          .json({
            message: "Product quantity updated successfully!",
            cart: existingCart,
          });
      }
      const updatedCart = await cartModel.findOneAndUpdate(
        { username },
        { $push: { productID, quantity } },
        { new: true }
      );
      return res
        .status(201)
        .json({
          message: "Product added to cart successfully!",
          cart: updatedCart,
        });
    }

    console.log("Creating new cart...");

    const newCart = new cartModel({
      username,
      productID,
      quantity,
    });

    await newCart.save();

    res
      .status(201)
      .json({ message: "Product added to cart successfully!", cart: newCart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

Cart.getCartByUser = async function getCartByUser(req, res) {
//   console.log("Getting cart by user...");
  const { username } = req.params;
//   console.log(username);

  try {
    const cart = await cartModel.find({ username });
    console.log(cart);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const cartItems = cart.map(item => ({
      productID: item.productID,
      quantity: item.quantity
    }));

    res.status(200).json({ cart: cartItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = Cart;
