const express = require("express");
const productController = require("../controllers/productController");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");

const router = express.Router();

router.get("/get-all-products", productController.getAllProducts);

router.post(
  "/add",
  authenticationMiddleware,
  productController.upload.single("image"),
  productController.addProduct
);

router.get("/get-all-products-except-user/:username", productController.getAllProductsExceptUser);

module.exports = router;
