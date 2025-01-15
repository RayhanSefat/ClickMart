const multer = require("multer");
const path = require("path");
const productModel = require("../models/productModel");
const { stringify } = require('querystring');

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

Product.getAllProductsExceptUser = async function (req, res) {
  try {
    console.log(req.params.username);
    const products = await productModel.find({ sellerUsername: { $ne: req.params.username } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

Product.getProductsByUser = async function (req, res) {
  try {
    const products = await productModel.find({ sellerUsername: req.params.username });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

Product.getProductById = async function (req, res) {
  try {
    console.log("API hitted successfully", req.params);
    const product = await productModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

// Add a new product 
Product.addProduct = async function (req, res) {
  try {
    const { name, sellerUsername, description, price, quantity, category } = req.body;

    // Validate required fields
    if (!name || !sellerUsername || !price || !quantity || !category) {
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
      quantityAvailable: quantity,
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

Product.updateProduct = async function (req, res) {
  console.log(req.body);
  try {
    const { _id, id, name, sellerUsername, description, price, quantityAvailable, category, imagePath } = req.body;

    console.log(_id);
    console.log(id);
    console.log(name);
    console.log(sellerUsername);
    console.log(description);
    console.log(price);
    console.log(quantityAvailable);
    console.log(category);
    
    // Validate required fields
    if (!name || !price || !quantityAvailable || !category) {
      return res.status(400).json({
        message: "Name, price, and category are required.",
      });
    }
    console.log("ok so far");

    // Find the product by ID and update it
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        id,
        name,
        sellerUsername,
        description,
        price,
        quantityAvailable,
        category,
        imagePath
      },
      { new: true }
    );

    // Return success response
    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });

    console.log("Updated successfully!");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = Product;
