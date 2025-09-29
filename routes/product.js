// routes/product.js
const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/product");
const auth = require("../middleware/user");

// Multer setup for single image
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/",auth, upload.single("image"), addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id",auth, upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
