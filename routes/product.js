const express = require('express');
const multer = require('multer');
const { allproduct, singleproduct, addproduct, updateproduct, deleteproduct } = require('../controllers/product');

const route = express.Router();

// Multer setup (store file in memory for Cloudinary upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
route.post('/add', upload.single('image'), addproduct);      // Create product with image
route.get('/', allproduct);                                 // Get all products
route.get('/:id', singleproduct);                           // Get single product
route.put('/:id', upload.single('image'), updateproduct);   // Update product (optional new image)
route.delete('/:id', deleteproduct);                        // Delete product

module.exports = route;

