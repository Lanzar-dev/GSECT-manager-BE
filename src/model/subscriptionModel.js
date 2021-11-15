import mongoose from "mongoose";

const { Schema, model, SchemaTypes } = mongoose;

const subscriptionSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },

    subPlan: {
      type: String,
      enum: ["basic", "premium"],
      required: [true, "please enter a valid subscription period"],
      default: "basic",
    },
    subType: {
      type: String,
      enum: ["regular", "trial", "promotional", "one time purchase"],
      default: "regular",
      required: [true, "please enter a valid subscription period"],
    },
    autoRenew: {
      type: Boolean,
      required: [true, "please enter a auto renewal status"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: [true, "please enter a valid status"],
    },
    price: {
      type: Number,
      required: [true, "please enter a valid price"],
    },
    nextBill: {
      type: Date,
      required: [true, "Please enter a billing date."],
    },
    billingCycle: {
      type: Number,
      required: [true, "Please enter a billing cycle."],
    },
    remindMe: {
      type: Boolean,
      defualt: false,
    },
    remindMeDate: {
      type: Date,
      default: this.nextBill,
    },
    endDate: {
      type: Date,
      required: [true, "Please enter a valid end time"],
    },
    paidAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Subscription = model("subscription", subscriptionSchema);
