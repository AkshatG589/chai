"use client";

import { useState } from "react";
import { Tag, Plus, X } from "lucide-react";

export default function EditSkills({ form, setForm }) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
    setNewSkill("");
  };

  const removeSkill = (index) => {
    setForm({
      ...form,
      skills: form.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">

      <h3 className="text-lg text-white font-semibold mb-4">Skills</h3>

      {/* ------------- Current Skills List ------------- */}
      <label className="text-gray-300 text-sm mb-2 block">Your Skills</label>

      <div className="flex flex-wrap gap-2 mb-4">
        {form.skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-neutral-800 text-white rounded-full flex items-center gap-2 border border-neutral-700"
          >
            <Tag size={16} className="text-gray-400" />
            {skill}
            <button
              onClick={() => removeSkill(idx)}
              className="text-red-400 hover:text-red-300 transition"
            >
              <X size={16} />
            </button>
          </span>
        ))}

        {form.skills.length === 0 && (
          <p className="text-gray-400 text-sm">No skills added yet.</p>
        )}
      </div>

{/* ------------- Add New Skill Input ------------- */}
<label className="text-gray-300 text-sm mb-1 block">Add a New Skill</label>

<div className="flex flex-col sm:flex-row gap-2">

  {/* Input */}
  <div className="flex items-center bg-neutral-800 px-3 rounded border border-neutral-700 flex-1">
    <Tag size={18} className="text-gray-400 mr-2" />
    <input
      value={newSkill}
      onChange={(e) => setNewSkill(e.target.value)}
      placeholder="Skill name"
      className="bg-transparent text-white outline-none flex-1"
    />
  </div>

  {/* Button */}
  <button
    onClick={addSkill}
    className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg 
               hover:bg-white/20 transition flex items-center gap-2 
               sm:w-auto w-full justify-center"
  >
    <Plus size={18} />
    Add
  </button>

</div>
    </div>
  );
}