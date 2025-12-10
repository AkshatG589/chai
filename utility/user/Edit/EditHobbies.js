"use client";

import { Heart, Trash2 } from "lucide-react";

export default function EditHobbies({ form, setForm }) {
  const addHobby = () => {
    setForm({ ...form, hobbies: [...form.hobbies, ""] });
  };

  const updateHobby = (index, value) => {
    const updated = [...form.hobbies];
    updated[index] = value;
    setForm({ ...form, hobbies: updated });
  };

  const removeHobby = (index) => {
    setForm({
      ...form,
      hobbies: form.hobbies.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">

      <h3 className="text-lg text-white font-semibold mb-4">Hobbies</h3>

      {/* List of hobby inputs */}
      {form.hobbies.map((hobby, index) => (
        <div
          key={index}
          className="flex items-center gap-3 mb-3 bg-neutral-900/40 px-3 py-2 rounded-lg border border-neutral-700"
        >
          {/* Icon */}
          <Heart size={18} className="text-gray-300" />

          {/* Input */}
          <input
            value={hobby}
            placeholder="Enter hobby"
            className="flex-1 bg-transparent text-white outline-none"
            onChange={(e) => updateHobby(index, e.target.value)}
          />

          {/* Remove Button */}
          <button
            onClick={() => removeHobby(index)}
            className="p-2 rounded-lg bg-red-600/30 hover:bg-red-600 border border-red-600/40 text-red-200 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      {/* Add New Hobby */}
      <button
        onClick={addHobby}
        className="mt-2 px-4 py-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
      >
        + Add Hobby
      </button>
    </div>
  );
}