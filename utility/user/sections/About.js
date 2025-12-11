"use client";

import EditBtn from "@/components/EditBtn";

export default function About({ extra, isOwner, onEditOpen }) {
  return (
    <div className=" p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10">
      
      {isOwner && (
        <EditBtn onClick={onEditOpen} />
      )}

      <h2 className="text-xl text-white font-medium mb-4">About</h2>
      
      <p className="text-gray-300 leading-relaxed">{extra.bio || "No bio added."}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-gray-400 text-sm">
        <p>📍 {extra.city}, {extra.state}</p>
        <p>🌍 {extra.country}</p>
        <p>🎂 {new Date(extra.dob).toDateString()}</p>
      </div>
    </div>
  );
}