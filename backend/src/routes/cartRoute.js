const express = require("express");
const cartController = require("../controllers/cartController");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");

const router = express.Router();

router.post("/add-to-cart", cartController.addToCart);
router.get("/get-cart-by-user/:username", cartController.getCartByUser);
router.put("/update-cart", cartController.updateCart);
router.get("/get-billing-details/:username", cartController.getBillingDetails);

module.exports = router;