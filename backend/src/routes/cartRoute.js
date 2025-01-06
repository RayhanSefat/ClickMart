const express = require("express");
const cartController = require("../controllers/cartController");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");

const router = express.Router();

router.post("/add-to-cart", cartController.addToCart);

module.exports = router;