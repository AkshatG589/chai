"use client";

import { IndianRupee, CreditCard, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

import { createOrder, verifyPayment } from "@/lib/api/payments";
import { loadRazorpayScript } from "@/utils/loadRazorpay";

export default function Payment({ payment, username, receiverId }) {
  if (!payment) return null;

  const { razorpay } = payment;
  const { getToken } = useAuth();
  const { isSignedIn } = useUser(); // 👈 CHECK LOGIN STATE

  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const presetAmounts = [100, 200, 300, 500];

  // -------------------------------------------------------------
  // HANDLE PAYMENT FLOW
  // -------------------------------------------------------------
  const handlePay = async () => {
    try {
      // 🔥 1) CHECK SIGN-IN
      if (!isSignedIn) {
        alert("Please sign in to make a payment.");
        window.location.href = "/sign-in";  // redirect to sign-in
        return;
      }

      if (!amount || amount < 1) {
        return alert("Please enter a valid amount.");
      }

      if (!razorpay?.keyId) {
        return alert("This user has not enabled Razorpay payments.");
      }

      setLoading(true);

      // 2) Load script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setLoading(false);
        return alert("Failed to load Razorpay. Check your network.");
      }

      const token = await getToken();

      // 3) Create backend order
      const orderRes = await createOrder({
        receiverUsername: username,
        amount,
        comment,
        token,
      });

      if (!orderRes.success) {
        setLoading(false);
        return alert(orderRes.message || "Failed to create order.");
      }

      // 4) Razorpay Checkout Options
      const options = {
        key: razorpay.keyId,
        amount: orderRes.amount,
        currency: orderRes.currency,
        name: "Support Creator",
        description: comment || "Support Payment",
        order_id: orderRes.orderId,

        handler: async function (response) {
          const verifyRes = await verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            paymentRecordId: orderRes.paymentRecordId,
            receiverId,
          });

          if (!verifyRes.success) {
            alert("Payment verification failed!");
          } else {
            alert("Payment successful!");
          }
        },

        theme: { color: "#00A86B" },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      setLoading(false);

    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      alert("Something went wrong while processing the payment.");
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10">

      {/* Heading */}
      <h2 className="text-2xl text-white font-bold mb-2 flex items-center gap-2">
        <CreditCard size={22} />
        Support This Creator
      </h2>

      <p className="text-gray-400 mb-6 text-sm">
        If you like this user’s work, you can support them.
      </p>

      {/* Amount Selection */}
      <div className="mb-4">
        <label className="text-gray-300 text-sm mb-2 block">Select Amount</label>

        <div className="flex flex-wrap gap-2 mb-3">
          {presetAmounts.map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`px-4 py-2 rounded-lg border text-sm transition ${
                amount == val
                  ? "bg-white text-black border-white"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              ₹{val}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="flex items-center bg-neutral-900 px-3 py-2 rounded-lg border border-white/20">
          <IndianRupee size={18} className="text-gray-400 mr-2" />
          <input
            type="number"
            placeholder="Custom amount"
            className="bg-transparent text-white outline-none flex-1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      {/* Comment box */}
      <div className="mb-5">
        <label className="text-gray-300 text-sm mb-1 block">Add a message (optional)</label>

        <div className="flex items-start bg-neutral-900 px-3 py-2 rounded-lg border border-white/20">
          <MessageSquare size={18} className="text-gray-400 mt-1 mr-2" />
          <textarea
            placeholder="Say something nice..."
            className="bg-transparent text-white outline-none flex-1 resize-none"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePay}
        disabled={loading}
        className={`w-full mt-6 py-3 rounded-lg border transition font-semibold ${
          loading
            ? "bg-white/5 border-white/10 text-gray-400 cursor-not-allowed"
            : "bg-white/10 border-white/20 text-white hover:bg-white/20"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}