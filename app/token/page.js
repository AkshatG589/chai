"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function page() {
  const { getToken, userId, isSignedIn } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchToken() {
      if (!isSignedIn) return;

      try {
        const jwt = await getToken({ template: "default" }); // Get the JWT
        setToken(jwt);
      } catch (err) {
        console.error("Error getting token:", err);
      }
    }
    fetchToken();
  }, [isSignedIn, getToken]);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-2xl">Please login to see your token</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Your Clerk JWT Token</h1>
      <p className="break-all bg-white/10 p-4 rounded-lg text-sm">{token}</p>
    </div>
  );
}