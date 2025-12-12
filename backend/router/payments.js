const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const UserExtra = require("../models/UserExtra");
const getClerkUser = require("../middleware/getClerkUser");
const checkOwner = require("../middleware/checkOwner");
const { users } = require("@clerk/clerk-sdk-node");  // Clerk backend SDK

router.post("/create-order", getClerkUser, async (req, res) => {
  try {
    const { receiverUsername, amount, comment } = req.body;

    // ---------------------- VALIDATION ----------------------
    if (!amount || amount < 1) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    // ---------------------- SENDER ----------------------
    const senderId = req.clerkUserId; // Clerk ID from middleware

    // Fetch sender's username from Clerk
    const senderUser = await users.getUser(senderId);
    const senderUsername = senderUser.username;

    // ---------------------- RECEIVER (Clerk) ----------------------
    const receiverList = await users.getUserList({
      username: [receiverUsername],
    });

    if (!receiverList || receiverList.length === 0) {
      return res.status(404).json({ success: false, message: "Receiver not found" });
    }

    const receiverId = receiverList[0].id; // Clerk user ID
    const finalReceiverUsername = receiverList[0].username; // REAL username from Clerk

    // ---------------------- FETCH RAZORPAY KEYS ----------------------
    const receiverExtra = await UserExtra.findOne({ clerkUserId: receiverId });

    if (
      !receiverExtra?.payment?.razorpay?.keyId ||
      !receiverExtra?.payment?.razorpay?.keySecret
    ) {
      return res.status(400).json({
        success: false,
        message: "Receiver has not configured Razorpay",
      });
    }

    const { keyId, keySecret } = receiverExtra.payment.razorpay;

    // ---------------------- CREATE ORDER ----------------------
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        receiverUsername: finalReceiverUsername,
        senderUsername: senderUsername,
        comment: comment || "",
      },
    });

    // ---------------------- SAVE PAYMENT ----------------------
    const paymentDoc = await Payment.create({
      sender: senderId,
      senderUsername,                  // ✔ NEW FIELD
      receiver: receiverId,
      receiverUsername: finalReceiverUsername, // ✔ NEW FIELD
      amount,
      comment: comment || "",
      method: "razorpay",
      status: "pending",
      razorpayOrderId: order.id,
    });

    // ---------------------- RESPONSE ----------------------
    return res.json({
      success: true,
      message: "Order created successfully",
      orderId: order.id,
      paymentRecordId: paymentDoc._id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ------------------------------
// VERIFY PAYMENT
// ------------------------------
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      paymentRecordId,
      receiverId
    } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment verification data" });
    }

    const payment = await Payment.findById(paymentRecordId);

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment record not found" });
    }

    if (payment.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ success: false, message: "Order ID mismatch" });
    }

    const receiverExtra = await UserExtra.findOne({ clerkUserId: receiverId });

    if (!receiverExtra?.payment?.razorpay?.keySecret) {
      return res.status(400).json({
        success: false,
        message: "Receiver Razorpay configuration missing",
      });
    }

    const keySecret = receiverExtra.payment.razorpay.keySecret;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ success: false, message: "Payment signature mismatch" });
    }

    payment.status = "success";
    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    await payment.save();

    return res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
    });

  } catch (error) {
    console.error("Payment Verify Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------------------
// GET ALL PAYMENTS FOR LOGGED-IN USER
// GET /api/payments/my-payments
// ------------------------------
router.get("/:username/my-payments", getClerkUser, checkOwner, async (req, res) => {
  try {
    const { username } = req.params;
    const isOwner = req.isOwner;   // from checkOwner middleware

    // -------------------------------------
    // 🔐 0️⃣ Authorization Check
    // -------------------------------------
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        isOwner:false,
        message: "Unauthorized access — you cannot view someone else's payments.",
      });
    }

    // -------------------------------------
    // 1️⃣ Get user (receiver) Clerk ID
    // -------------------------------------
    const receiverList = await users.getUserList({
      username: [username],
    });

    if (!receiverList || receiverList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const targetClerkId = receiverList[0].id;

    // -------------------------------------
    // 2️⃣ Fetch payments for this user ONLY
    // -------------------------------------
    const sentPayments = await Payment.find({ sender: targetClerkId })
      .sort({ createdAt: -1 });

    const receivedPayments = await Payment.find({ receiver: targetClerkId })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      isOwner: true,
      sentPayments,
      receivedPayments,
    });

  } catch (error) {
    console.error("Fetch Payments Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


module.exports = router;