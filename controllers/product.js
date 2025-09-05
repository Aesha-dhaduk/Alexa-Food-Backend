const ProductModel = require('../models/product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../utils/upload'); // adjust path where you saved uploadFile.js

// Add Product with image upload
async function addproduct(req, res) {
    try {
        const payload = req.body;

        // Check if file is uploaded
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadFile(req.file.buffer);
        }

        const Newproduct = await ProductModel.create({
            ...payload,
            image: imageUrl // save image URL in DB
        });

        res.status(201).json({
            status: 201,
            message: "Product created successfully",
            data: Newproduct,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Product failed",
            error: err.message,
        });
    }
}

// Fetch all products
async function allproduct(req, res) {
    const Allproduct = await ProductModel.find();

    res.json({
        status: 200,
        message: "All products fetched successfully",
        data: Allproduct
    });
}

// Fetch single product
async function singleproduct(req, res) {
    const { id } = req.params;

    const Singleproduct = await ProductModel.findOne({ _id: id });

    res.json({
        status: 200,
        message: "Fetched single product successfully",
        data: Singleproduct
    });
}

// Update product (with optional new image upload)
async function updateproduct(req, res) {
    try {
        const { id } = req.params;
        const payload = req.body;

        // If new image uploaded
        if (req.file) {
            const imageUrl = await uploadFile(req.file.buffer);
            payload.image = imageUrl;
        }

        const Updateproduct = await ProductModel.findByIdAndUpdate(id, payload, { new: true });

        res.json({
            status: 200,
            message: "Updated successfully",
            data: Updateproduct
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Update failed",
            error: err.message
        });
    }
}

// Delete product
async function deleteproduct(req, res) {
    const { id } = req.params;

    const Deleteproduct = await ProductModel.findByIdAndDelete(id);

    res.json({
        status: 200,
        message: "Deleted successfully",
        data: Deleteproduct
    });
}

module.exports = { addproduct, allproduct, singleproduct, updateproduct, deleteproduct };
