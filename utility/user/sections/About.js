"use client";

import { useState } from "react";
import EditBtn from "@/components/EditBtn";
import EditSectionModal from "@/components/EditSectionModal";
import { useAuth } from "@clerk/nextjs";
import { updateUserExtra } from "@/lib/api/user";

export default function About({ extra }) {
  const { getToken } = useAuth();

  const [open, setOpen] = useState(false);

  async function handleSave(updated) {
    const token = await getToken();

    await updateUserExtra(
      { 
        bio: updated.bio,
        city: updated.city,
        state: updated.state,
        country: updated.country,
        dob: updated.dob,
      },
      token
    );

    setOpen(false);
    window.location.reload(); // refresh page with updated data
  }

  return (
    <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border border-white/10 realtive z-50">

      {/* Edit Button (Appears top-right) */}
      <EditBtn onClick={() => setOpen(true)} />

      <h2 className="text-xl text-white font-medium mb-4">About</h2>

      <p className="text-gray-300 leading-relaxed">{extra.bio || "No bio added."}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-gray-400 text-sm">
        <p>📍 {extra.city}, {extra.state}</p>
        <p>🌍 {extra.country}</p>
        <p>🎂 {new Date(extra.dob).toDateString()}</p>
      </div>

      {/* Modal */}
      <EditSectionModal
        title="Edit About"
        open={open}
        onClose={() => setOpen(false)}
        initialData={{
          bio: extra.bio,
          city: extra.city,
          state: extra.state,
          country: extra.country,
          dob: extra.dob,
        }}
        onSave={handleSave}
      />
    </div>
  );
}