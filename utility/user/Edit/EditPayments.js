"use client";

import {
  Landmark,
  CreditCard,
  Building,
  KeyRound,
  Hash,
  DollarSign,
  Wallet,
  Image as ImageIcon,
  Mail,
} from "lucide-react";

export default function EditPayments({ form, setForm }) {
  const payment = form.payment ?? {
    upiId: "",
    qrImage: "",
    paypal: "",
    bankAccount: {
      accountNumber: "",
      ifsc: "",
      bankName: "",
      branchName: "",
    },
    razorpay: {
      keyId: "",
      keySecret: "",
    },
  };

  const bank = payment.bankAccount ?? {};
  const razor = payment.razorpay ?? {};

  const update = (obj) => {
    setForm({ ...form, payment: { ...payment, ...obj } });
  };

  const updateBank = (key, val) => {
    setForm({
      ...form,
      payment: { ...payment, bankAccount: { ...bank, [key]: val } },
    });
  };

  const updateRazor = (key, val) => {
    setForm({
      ...form,
      payment: { ...payment, razorpay: { ...razor, [key]: val } },
    });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">

      <h3 className="text-lg text-white font-semibold mb-4">Payment Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* ---------- UPI ID ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">UPI ID</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <Wallet size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="UPI ID"
              value={payment.upiId}
              onChange={(e) => update({ upiId: e.target.value })}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* ---------- QR Image URL ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">QR Image URL</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <ImageIcon size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="QR Image URL"
              value={payment.qrImage}
              onChange={(e) => update({ qrImage: e.target.value })}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* ---------- PayPal Email ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">PayPal Email</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <Mail size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="PayPal Email"
              value={payment.paypal}
              onChange={(e) => update({ paypal: e.target.value })}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* ---------- Bank Account Number ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Bank Account Number</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <CreditCard size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="Account Number"
              value={bank.accountNumber}
              onChange={(e) => updateBank("accountNumber", e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* ---------- IFSC ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">IFSC Code</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <Hash size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="IFSC Code"
              value={bank.ifsc}
              onChange={(e) => updateBank("ifsc", e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* ---------- Bank Name ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Bank Name</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <Landmark size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="Bank Name"
              value={bank.bankName}
              onChange={(e) => updateBank("bankName", e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* ---------- Branch Name ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Branch Name</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <Building size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="Branch Name"
              value={bank.branchName}
              onChange={(e) => updateBank("branchName", e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* ---------- Razorpay Key ID ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Razorpay Key ID</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <KeyRound size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="Key ID"
              value={razor.keyId}
              onChange={(e) => updateRazor("keyId", e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

        {/* ---------- Razorpay Secret ---------- */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Razorpay Secret</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <KeyRound size={18} className="text-gray-400 mr-2" />
            <input
              placeholder="Key Secret"
              value={razor.keySecret}
              onChange={(e) => updateRazor("keySecret", e.target.value)}
              className="flex-1 bg-transparent text-white outline-none"
            />
          </div>
        </div>

      </div>
    </div>
  );
}