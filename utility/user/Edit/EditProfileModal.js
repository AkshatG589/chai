"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { updateUserExtra } from "@/lib/api/user";

// Import all edit components
import EditAbout from "./EditAbout";
import EditEducation from "./EditEducation";
import EditSkills from "./EditSkills";
import EditLanguages from "./EditLanguages";
import EditHobbies from "./EditHobbies";
import EditLinks from "./EditLinks";
import EditPayments from "./EditPayments";
import EditSettings from "./EditSettings";

export default function EditProfileModal({ open, onClose, data }) {
  const { getToken } = useAuth();

  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);

    const token = await getToken();
    await updateUserExtra(form, token);

    setSaving(false);
    onClose();

    // refresh profile route
    window.location.reload();
  };

  return (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[99999] 
                  flex items-center justify-center px-3 py-6">

    <div className="w-full max-w-3xl bg-neutral-900 rounded-2xl 
                    border border-white/20 shadow-2xl p-6
                    max-h-[90vh] overflow-y-auto">

      <h1 className="text-2xl font-semibold text-white mb-5">Edit Profile</h1>

      <div className="flex flex-col gap-6">

        <EditAbout form={form} setForm={setForm} />
        <EditEducation form={form} setForm={setForm} />
        <EditSkills form={form} setForm={setForm} />
        <EditLanguages form={form} setForm={setForm} />
        <EditHobbies form={form} setForm={setForm} />
        <EditLinks form={form} setForm={setForm} />
        <EditPayments form={form} setForm={setForm} />
        <EditSettings form={form} setForm={setForm} />

      </div>

      <div className="mt-6 flex justify-end gap-3">

        <button
          onClick={onClose}
          className="px-5 py-2 rounded-lg bg-neutral-700 text-white
                     hover:bg-neutral-600 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-white text-black font-semibold 
                     hover:bg-gray-200 transition flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-black 
                              border-t-transparent animate-spin rounded-full"></div>
              Saving…
            </>
          ) : (
            "Save All"
          )}
        </button>

      </div>
    </div>
  </div>
);
}