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
router.get("/get-products-by-user/:username", productController.getProductsByUser);
router.get("/get-product-by-id/:id", async (req, res) => {
  // console.log(req.params.id);
  const product = await productController.getProductById(req.params.id);
  res.json(product);
});
router.put("/update-product/:id", productController.updateProduct);

module.exports = router;
