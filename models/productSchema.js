import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enun: ["Shoes", "Clothing", "Tech"],
    },
    brand: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
    },
    countInStock: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAIPick: {
      type: Boolean,
    },
    vibeTags: {
      type: [String],
    },
    aiReason: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
