"use client";

import React,{ useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getUserPayments } from "@/lib/api/payments";
import PaymentCard from "@/components/PaymentCard";

export default function page({ params }) {
  const resolved = React.use(params);
  const username = resolved.username;

  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [sentPayments, setSentPayments] = useState([]);
  const [receivedPayments, setReceivedPayments] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

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
      <div className="text-center text-gray-300 mt-10">Loading payments...</div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-white mb-6">
        Payments for @{username}
      </h1>

      {isOwner && (
        <p className="text-gray-400 mb-6 text-sm">
          You are viewing your own payment dashboard.
        </p>
      )}

      {/* Received Section */}
      <section className="mb-10">
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

      {/* Sent Section */}
      <section className="mb-10">
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
    </div>
  );
}