// lib/api/payments.js

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

// ---------------------------------------
// CREATE ORDER
// ---------------------------------------
export async function createOrder({
  receiverUsername,
  amount,
  comment = "",
  token,         // Clerk JWT (sender auth)
}) {
  try {
    const res = await fetch(`${API}/api/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // authenticate sender
      },
      body: JSON.stringify({
        receiverUsername,
        amount,
        comment,
      }),
    });

    return res.json();
  } catch (error) {
    console.error("createOrder() error:", error);
    return { success: false, message: "Network error" };
  }
}

// ---------------------------------------
// VERIFY PAYMENT
// ---------------------------------------
export async function verifyPayment({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
  paymentRecordId,
  receiverId,
}) {
  try {
    const res = await fetch(`${API}/api/payments/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        paymentRecordId,
        receiverId,
      }),
    });

    return res.json();
  } catch (error) {
    console.error("verifyPayment() error:", error);
    return { success: false, message: "Network error" };
  }
}