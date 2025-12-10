"use client";

import React, { useState, useEffect } from "react";

export default function EditSectionModal({
  title,
  initialData,
  open,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(initialData || {});

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] px-4"
    >
      <div
        className="w-full max-w-md bg-neutral-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 animate-modalPop"
      >
        <h2 className="text-2xl text-white font-semibold mb-5">{title}</h2>

        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-gray-300 text-sm mb-1 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>

              <input
                type="text"
                value={value}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-white/20 outline-none"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-700 text-white hover:bg-neutral-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* Keyframe Animation */}
      <style jsx>{`
        @keyframes modalPop {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalPop {
          animation: modalPop 0.25s ease;
        }
      `}</style>
    </div>
  );
}