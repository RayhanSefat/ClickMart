const multer = require("multer");
const path = require("path");
const productModel = require("../models/productModel");

const Product = {};

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../../frontend/public/images/product-images/"); 
    cb(null, uploadPath); // Ensure the directory exists or handle errors
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}_${req.body.sellerUsername}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

Product.upload = multer({ storage });

// Get all products
Product.getAllProducts = async function (req, res) {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new product
Product.addProduct = async function (req, res) {
  try {
    const { name, sellerUsername, description, price, category } = req.body;

    // Validate required fields
    if (!name || !sellerUsername || !price || !category) {
      return res.status(400).json({
        message: "Name, sellerUsername, price, and category are required.",
      });
    }
    
    // Get the image path from the uploaded file
    const imagePath = req.file ? req.file.path.replace("\\", "/") : null;
    
    
    // Create a new product document
    const newProduct = new productModel({
      name,
      sellerUsername,
      description,
      price,
      category,
      imagePath,
    });

    // console.log(newProduct);
    
    // Save the product to the database
    await newProduct.save()
      .then(() => console.log("Product added successfully!"))
      .catch((err) => console.error(err));

    // Return success response
    res.status(201).json({
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = Product;
