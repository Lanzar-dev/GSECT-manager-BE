import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  image: { type: String },
  subscriptionPlan: {
    type: String,
    required: [true, "Please choose a subscription type"],
    default: "monthly",
  },
  price: {
    type: Number,
    required: [true, "Please Enter a Product Price"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  billingCycle: {
    type: Number,
    required: [true, "Please enter a billing cycle."],
  },
  remindMe: {
    type: Boolean,
    default: false,
  },
});

export const Product = model("product", productSchema);
