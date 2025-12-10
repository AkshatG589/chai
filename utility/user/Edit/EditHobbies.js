"use client";

import React, { useState, useEffect } from "react";
import { updateUserExtra } from "@/lib/api/user";
import { useAuth } from "@clerk/nextjs";

export default function EditHobbies({ open, onClose, hobbies }) {
  const { getToken } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(hobbies || []);
  }, [hobbies]);

  if (!open) return null;

  const addHobby = () => {
    setList([...list, ""]);
  };

  const updateHobby = (index, value) => {
    const arr = [...list];
    arr[index] = value;
    setList(arr);
  };

  const removeHobby = (index) => {
    const arr = list.filter((_, i) => i !== index);
    setList(arr);
  };

  const saveChanges = async () => {
    const token = await getToken();
    await updateUserExtra({ hobbies: list }, token);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
      
      <div className="w-full max-w-md bg-neutral-900 border border-white/20 rounded-2xl p-6 shadow-xl animate-modalPop">

        <h2 className="text-2xl text-white font-semibold mb-4">
          Edit Hobbies
        </h2>

        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">

          {list.map((hobby, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={hobby}
                className="flex-1 px-3 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 outline-none"
                onChange={(e) => updateHobby(index, e.target.value)}
              />
              <button
                onClick={() => removeHobby(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={addHobby}
            className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition"
          >
            + Add Hobby
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* POP ANIMATION */}
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