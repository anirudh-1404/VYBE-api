import { Product } from "../models/productSchema.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, countInStock, brand, image } =
      req.body;

    if (!name || !description || !price || !category || !countInStock) {
      return res.status(400).json({
        message: "All feilds are required!",
      });
    }

    const product = await Product.create({
      author: req.user._id,
      name,
      description,
      price,
      category,
      countInStock,
      brand,
      image,
    });

    return res.status(201).json({
      message: "Product created successfully",
      productId: product._id,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});

    if (!products) {
      return res.json(404).json({
        message: "No product found!",
      });
    }

    return res.status(200).json({
      message: "All products fetched successfully!",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//  get product by id
export const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    return res.status(200).json({
      message: "Product fetched",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// update product
export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// delete product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.isActive = false;
    await product.save();

    return res.status(200).json({
      message: "Product deleted successfully (soft delete)",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
