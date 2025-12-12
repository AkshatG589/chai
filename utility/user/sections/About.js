"use client";

import EditBtn from "@/components/EditBtn";

export default function About({ extra, isOwner, onEditOpen }) {
  // --------------------------------------------------------
  // CASE 1 → No extra profile exists yet
  // --------------------------------------------------------
  if (!extra) {
    return (
      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg
                      border border-white/10 flex flex-col items-center text-center py-10">

        {isOwner && (
          <EditBtn onClick={onEditOpen} />
        )}

        <h2 className="text-xl text-white font-medium mt-4">Complete Your Profile</h2>

        <p className="text-gray-400 text-sm mt-2 max-w-sm">
          Your profile details are empty. Click the edit button to add your bio, city, birthdate, and more.
        </p>
      </div>
    );
  }

  // --------------------------------------------------------
  // CASE 2 → Extra profile exists
  // --------------------------------------------------------
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 relative">

      {/* EDIT BUTTON */}
      {isOwner && (
        <div className="absolute top-4 right-4">
          <EditBtn onClick={onEditOpen} />
        </div>
      )}

      <h2 className="text-xl text-white font-medium mb-4">About</h2>

      <p className="text-gray-300 leading-relaxed">{extra.bio || "No bio added."}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-gray-400 text-sm">
        <p>📍 {extra.city || "Unknown"}, {extra.state || ""}</p>
        <p>🌍 {extra.country || "Unknown"}</p>
        <p>
          🎂 {extra.dob ? new Date(extra.dob).toDateString() : "No birthdate added"}
        </p>
      </div>
    </div>
  );
}