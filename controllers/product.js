// controllers/productController.js
const ProductModel = require("../models/product");
const { uploadFile } = require("../utils/upload"); // adjust path if needed

// ✅ Create Product
const addProduct = async (req, res) => {
    try {
        const { title, price, description } = req.body;

        if (!title || !price || !description) {
            return res.status(400).json({
                status: 400,
                message: "Title, price, and description are required",
            });
        }

        let imageUrl = null;
        if (req.file && req.file.buffer) {
            imageUrl = await uploadFile(req.file.buffer);
        }

        const newProduct = await ProductModel.create({
            title,
            price,
            description,
            image: imageUrl,
        });

        res.status(201).json({
            status: 201,
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({
            status: 500,
            message: "Product creation failed",
            error: err.message,
        });
    }
};

// ✅ Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 200,
            message: "Products fetched successfully",
            data: products,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed to fetch products",
            error: err.message,
        });
    }
};

// ✅ Get Single Product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Product fetched successfully",
            data: product,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed to fetch product",
            error: err.message,
        });
    }
};

// ✅ Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description } = req.body;

        let updateData = { title, price, description };

        if (req.file && req.file.buffer) {
            const imageUrl = await uploadFile(req.file.buffer);
            updateData.image = imageUrl;
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed to update product",
            error: err.message,
        });
    }
};

// ✅ Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed to delete product",
            error: err.message,
        });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
