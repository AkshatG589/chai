// /utils/payments.js

import { loadRazorpayScript } from "./loadRazorpay";
import { createOrder, verifyPayment } from "@/lib/api/payments";

/**
 * Opens Razorpay and verifies the payment
 */
export async function processRazorpayPayment({
  username,
  receiverId,
  razorpayKey,
  amount,
  comment,
  token,
  onStatusChange, // callback to update UI
}) {
  try {
    // -------------------------------
    // 1. Load Razorpay JS
    // -------------------------------
    onStatusChange("loading");
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      onStatusChange("failed");
      return { success: false, message: "Failed to load Razorpay" };
    }

    onStatusChange("creatingOrder");

    // -------------------------------
    // 2. Create Order in backend
    // -------------------------------
    const orderRes = await createOrder({
      receiverUsername: username,
      amount,
      comment,
      token,
    });

    if (!orderRes.success) {
      onStatusChange("failed");
      return { success: false, message: orderRes.message };
    }

    // -------------------------------
    // 3. Razorpay Checkout config
    // -------------------------------
    const options = {
      key: razorpayKey,
      amount: orderRes.amount,
      currency: orderRes.currency,
      name: `Payment to @${username}`,
      description: comment || "Support payment",
      order_id: orderRes.orderId,

      handler: async function (response) {
        onStatusChange("verifying");

        const verifyRes = await verifyPayment({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          paymentRecordId: orderRes.paymentRecordId,
          receiverId,
        });

        if (!verifyRes.success) {
          onStatusChange("failed");
        } else {
          onStatusChange("success");
        }
      },

      theme: { color: "#00A86B" },
    };

    // -------------------------------
    // 4. Open Razorpay popup
    // -------------------------------
    const razor = new window.Razorpay(options);
    razor.open();

    onStatusChange("processing");

    return { success: true };
  } catch (err) {
    console.error("Razorpay process error:", err);
    onStatusChange("failed");
    return { success: false, message: "Unexpected error" };
  }
}