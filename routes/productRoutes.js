import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/product", protect, createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
router.patch("/products/:id", protect, updateProduct);
router.delete("/product/:id", protect, deleteProduct);

export default router;
