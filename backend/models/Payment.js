const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    sender: {
      type: String,     // Clerk User ID
      required: true,
    },

    senderUsername: {
      type: String,     // Clerk Username
      default: "unknown",
    },

    receiver: {
      type: String,     // Clerk User ID
      required: true,
    },

    receiverUsername: {
      type: String,     // Clerk Username
      default: "unknown",
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
      enum: ["razorpay"],
      default: "razorpay",
    },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);