const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    sender: {
      type: String,     // Clerk User ID
      required: true,
    },

    receiver: {
      type: String,     // Clerk User ID
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    comment: {
      type: String,
      default: "",
    },

    method: {
      type: String,
      enum: ["razorpay"],   // 👈 Only Razorpay allowed
      default: "razorpay",
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    // 🔹 Razorpay fields (required after verification)
    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    razorpaySignature: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);