"use client";

import { IndianRupee, CreditCard, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

import { processRazorpayPayment } from "@/utils/payments";

export default function Payment({ payment, username, receiverId }) {
  if (!payment) return null;

  const { razorpay } = payment;
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();

  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | creatingOrder | verifying | success | failed

  const presetAmounts = [100, 200, 300, 500];

  // Status UI message
  const statusMessage = {
    idle: "",
    loading: "Loading Razorpay...",
    creatingOrder: "Creating order...",
    processing: "Processing payment...",
    verifying: "Verifying payment...",
    success: "🎉 Payment Successful!",
    failed: "❌ Payment Failed!",
  };

  // -------------------------------------------------------------
  const handlePay = async () => {
    if (!isSignedIn) {
      alert("Please sign in to make a payment.");
      return (window.location.href = "/sign-in");
    }

    if (!amount || amount < 1) return alert("Enter a valid amount.");

    if (!razorpay?.keyId)
      return alert("This creator has not enabled Razorpay payments.");

    const token = await getToken();

    await processRazorpayPayment({
      username,
      receiverId,
      razorpayKey: razorpay.keyId,
      amount,
      comment,
      token,

      onStatusChange: (s) => setStatus(s),
    });
  };

  // -------------------------------------------------------------
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10">
      <h2 className="text-2xl text-white font-bold mb-2 flex items-center gap-2">
        <CreditCard size={22} />
        Support This Creator
      </h2>

      <p className="text-gray-400 mb-6 text-sm">
        Like this creator? You can support them by sending a small contribution.
      </p>

      {/* Status Message */}
      {status !== "idle" && (
        <div className="mb-4 text-center text-sm text-gray-300">
          {statusMessage[status]}
        </div>
      )}

      {/* Amount Selection */}
      <div className="mb-4">
        <label className="text-gray-300 text-sm mb-2 block">Choose amount</label>

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

      {/* Comment */}
      <div className="mb-5">
        <label className="text-gray-300 text-sm mb-1 block">Message (optional)</label>
        <div className="flex items-start bg-neutral-900 px-3 py-2 rounded-lg border border-white/20">
          <MessageSquare size={18} className="text-gray-400 mt-1 mr-2" />
          <textarea
            placeholder="Say something nice…"
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
        disabled={status === "loading" || status === "creatingOrder"}
        className="w-full mt-6 py-3 rounded-lg bg-white/10 border border-white/20 
                   text-white hover:bg-white/20 transition font-semibold"
      >
        {status === "loading" ? "Loading..." : "Pay Now"}
      </button>
    </div>
  );
}