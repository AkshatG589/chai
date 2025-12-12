"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getUserPayments } from "@/lib/api/payments";
import PaymentCard from "@/components/PaymentCard";
import NotFound from "@/components/NotFound";

export default function PaymentsPage({ params }) {
  const resolved = React.use(params);
  const username = resolved.username;

  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sentPayments, setSentPayments] = useState([]);
  const [receivedPayments, setReceivedPayments] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  // TAB STATE
  const [tab, setTab] = useState("received");

  useEffect(() => {
    async function loadPayments() {
      const token = await getToken();
      const res = await getUserPayments(username, token);

      if (res.success) {
        setSentPayments(res.sentPayments || []);
        setReceivedPayments(res.receivedPayments || []);
        setIsOwner(res.isOwner);
      }

      setLoading(false);
    }

    loadPayments();
  }, [username]);

  if (loading)
    return (
      <div className="text-center text-gray-300 mt-10">
        Loading payments...
      </div>
    );

  // 🚫 BLOCK ACCESS IF NOT OWNER
  if (!isOwner) {
    return <NotFound />;
  }

  // ✅ OWNER UI
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-white mb-2">
        Payments for @{username}
      </h1>

      <p className="text-gray-400 mb-6 text-sm">
        You are viewing your own payment dashboard.
      </p>

      {/* -------------------------------------------------- */}
      {/*                MODERN PILL TABS                    */}
      {/* -------------------------------------------------- */}

      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setTab("received")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
            tab === "received"
              ? "bg-white text-black border-white"
              : "bg-neutral-900 border-white/10 text-gray-300 hover:bg-neutral-800"
          }`}
        >
          Payments Received
        </button>

        <button
          onClick={() => setTab("sent")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
            tab === "sent"
              ? "bg-white text-black border-white"
              : "bg-neutral-900 border-white/10 text-gray-300 hover:bg-neutral-800"
          }`}
        >
          Payments Sent
        </button>
      </div>

      {/* -------------------------------------------------- */}
      {/*                 TAB CONTENT DISPLAY                */}
      {/* -------------------------------------------------- */}

      {tab === "received" ? (
        <section>
          <h2 className="text-xl text-white font-semibold mb-4">
            💰 Payments Received
          </h2>

          {receivedPayments.length === 0 ? (
            <p className="text-gray-500 text-sm">No payments received yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {receivedPayments.map((p) => (
                <PaymentCard key={p._id} payment={p} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section>
          <h2 className="text-xl text-white font-semibold mb-4">
            📤 Payments Sent
          </h2>

          {sentPayments.length === 0 ? (
            <p className="text-gray-500 text-sm">You haven’t sent any payments.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {sentPayments.map((p) => (
                <PaymentCard key={p._id} payment={p} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}