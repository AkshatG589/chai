"use client";

import { Globe, GraduationCap, Trash2 } from "lucide-react";

export default function EditLanguages({ form, setForm }) {
  const addLanguage = () => {
    setForm({
      ...form,
      languages: [...form.languages, { language: "", proficiency: "Beginner" }],
    });
  };

  const updateLang = (index, key, value) => {
    const updated = [...form.languages];
    updated[index][key] = value;
    setForm({ ...form, languages: updated });
  };

  const removeLanguage = (index) => {
    setForm({
      ...form,
      languages: form.languages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">

      <h3 className="text-lg text-white font-semibold mb-4">Languages</h3>

      {form.languages.map((lang, index) => (
        <div
          key={index}
          className="border border-white/10 rounded-lg p-4 mb-4 bg-neutral-900/40"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-white font-medium">Language #{index + 1}</p>

            <button
              onClick={() => removeLanguage(index)}
              className="p-2 rounded-lg bg-red-600/30 hover:bg-red-600 border border-red-600/40 text-red-200 transition"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* LANGUAGE NAME */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-300 text-sm">Language</label>

              <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
                <Globe size={18} className="text-gray-400 mr-2" />

                <input
                  placeholder="Language"
                  className="flex-1 bg-transparent text-white outline-none"
                  value={lang.language}
                  onChange={(e) => updateLang(index, "language", e.target.value)}
                />
              </div>
            </div>

            {/* PROFICIENCY */}
            <div className="flex flex-col gap-1">
              <label className="text-gray-300 text-sm">Proficiency</label>

              <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
                <GraduationCap size={18} className="text-gray-400 mr-2" />

                <select
                  className="flex-1 bg-transparent text-white outline-none"
                  value={lang.proficiency}
                  onChange={(e) =>
                    updateLang(index, "proficiency", e.target.value)
                  }
                >
                  {[
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                    "Fluent",
                    "Native",
                  ].map((level) => (
                    <option
                      key={level}
                      value={level}
                      className="text-black"
                    >
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Add New Language */}
      <button
        onClick={addLanguage}
        className="mt-2 px-4 py-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
      >
        + Add Language
      </button>
    </div>
  );
}