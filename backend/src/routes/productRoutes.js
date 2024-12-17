const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/get-all-products', productController.getAllProducts);

module.exports = router;