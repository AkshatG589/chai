"use client";

import React from "react";

export default function UserHero({ user, extra }) {
  const { user: clerkUser, isOwner } = user;
  const { username , firstName, lastName, email, imageUrl } = clerkUser;

  const coverPhoto = extra?.coverPhotoUrl;

  return (
    <div className="w-full relative">

      {/* ░░░ COVER PHOTO ░░░ */}
      <div
        className="relative w-full h-[32vh] md:h-[40vh] rounded-b-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${coverPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

        {/* Floating Particles (subtle) */}
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

        {/* OPTIONAL: remove this if you don't want any centered text */}
        {/* (you asked to remove all details, so leaving this empty) */}
      </div>

      {/* Gradient Spotlight Behind Avatar */}
      <div className="absolute top-[28vh] md:top-[36vh] left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-purple-500/40 to-transparent blur-2xl" />

      {/* ░░░ AVATAR ░░░ */}
      <div className="relative flex justify-center -mt-16 z-30">
        <img
          src={imageUrl}
          className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
        />
      </div>

      {/* ░░░ USER DETAILS BELOW AVATAR (CLEAN) ░░░ */}
      <div className="mt-20 text-center">
        <h1 className="text-3xl font-semibold text-white">
          {firstName} {lastName}
        </h1>

        <p className="text-gray-300">@{username}</p>

        {extra?.settings?.showEmail && (
          <p className="text-gray-400">{email}</p>
        )}

        {isOwner && (
          <button className="mt-4 px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all shadow-lg">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}