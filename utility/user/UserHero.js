"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function UserHero({ user, extra }) {
  const { user: clerkUser, isOwner } = user;
  const { username, firstName, lastName, email, imageUrl } = clerkUser;

  const { signOut } = useAuth();

  const coverPhoto = extra?.coverPhotoUrl;

  const handleLogout = async () => {
    await signOut({ redirectUrl: "/" });
  };

  return (
    <div className="w-full relative">

      {/* ░░░ COVER PHOTO ░░░ */}
      <div
        className="relative w-full h-[32vh] md:h-[40vh] rounded-b-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${coverPhoto || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glow */}
      <div className="absolute top-[28vh] md:top-[36vh] left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-purple-500/40 to-transparent blur-2xl" />

      {/* AVATAR */}
      <div className="relative flex justify-center -mt-16 z-30">
        <img
          src={imageUrl}
          alt={username}
          className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
        />
      </div>

      {/* USER INFO */}
      <div className="mt-20 text-center">
        <h1 className="text-3xl font-semibold text-white">
          {firstName} {lastName}
        </h1>

        <p className="text-gray-300">@{username}</p>

        {extra?.settings?.showEmail && email && (
          <p className="text-gray-400">{email}</p>
        )}

        {/* 🔐 LOGOUT BUTTON (OWNER ONLY) */}
        {isOwner && (
          <button
            onClick={handleLogout}
            className="mt-5 inline-flex items-center gap-2
                       px-6 py-2.5 rounded-full
                       bg-red-500/10 text-red-400
                       border border-red-500/20
                       hover:bg-red-500/20 hover:text-red-300
                       transition shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        )}
      </div>
    </div>
  );
}