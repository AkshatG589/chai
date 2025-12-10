"use client";

import { useState } from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  BookOpenCheck,
  BarChart2,
  MapPin,
  Globe,
  FileText,
  Calendar,
} from "lucide-react";

export default function EditEducation({ form, setForm }) {
  const education = form.education ?? {
    school10: {},
    school12: {},
    colleges: [],
  };

  const school10 = education.school10 ?? {};
  const school12 = education.school12 ?? {};
  const colleges = education.colleges ?? [];

  const addCollege = () => {
    const newCollege = {
      name: "",
      degree: "",
      branch: "",
      startYear: "",
      endYear: "",
      cgpa: "",
      city: "",
      state: "",
      description: "",
    };

    setForm({
      ...form,
      education: { ...education, colleges: [...colleges, newCollege] },
    });
  };

  const updateCollege = (index, key, value) => {
    const updated = [...colleges];
    updated[index][key] = value;

    setForm({
      ...form,
      education: { ...education, colleges: updated },
    });
  };

  const removeCollege = (index) => {
    setForm({
      ...form,
      education: {
        ...education,
        colleges: colleges.filter((_, i) => i !== index),
      },
    });
  };

  // ⭐ Lucide Icon Mapping
  const fieldIcon = {
    name: <User size={18} />,
    degree: <GraduationCap size={18} />,
    branch: <BookOpen size={18} />,
    stream: <BookOpenCheck size={18} />,
    marks: <BarChart2 size={18} />,
    cgpa: <BarChart2 size={18} />,
    city: <MapPin size={18} />,
    state: <Globe size={18} />,
    description: <FileText size={18} />,
    startYear: <Calendar size={18} />,
    endYear: <Calendar size={18} />,
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">

      <h3 className="text-lg text-white font-semibold mb-4">Education</h3>

      {/* ------------------------ 10th ------------------------ */}
      <h4 className="text-white font-medium mb-3">10th Standard</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["name", "marks", "city", "state", "description"].map((field) => (
          <div key={field} className="flex flex-col gap-1">

            <label className="text-gray-300 text-sm capitalize">
              {field}
            </label>

            <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
              <span className="text-gray-400 mr-2">{fieldIcon[field]}</span>

              <input
                placeholder={field}
                className="flex-1 bg-transparent text-white outline-none"
                value={school10[field] ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    education: {
                      ...education,
                      school10: { ...school10, [field]: e.target.value },
                    },
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------ 12th ------------------------ */}
      <h4 className="text-white font-medium mt-6 mb-3">12th Standard</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["name", "marks", "stream", "city", "state", "description"].map(
          (field) => (
            <div key={field} className="flex flex-col gap-1">

              <label className="text-gray-300 text-sm capitalize">{field}</label>

              <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
                <span className="text-gray-400 mr-2">{fieldIcon[field]}</span>

                <input
                  placeholder={field}
                  className="flex-1 bg-transparent text-white outline-none"
                  value={school12[field] ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      education: {
                        ...education,
                        school12: { ...school12, [field]: e.target.value },
                      },
                    })
                  }
                />
              </div>
            </div>
          )
        )}
      </div>

      {/* ------------------------ COLLEGES ------------------------ */}
      <h4 className="text-white font-medium mt-6 mb-3">Colleges</h4>

      {colleges.map((col, index) => (
        <div
          key={index}
          className="border border-white/10 p-4 rounded-xl mb-4 bg-neutral-900/40"
        >
          <div className="flex justify-between items-center mb-3">
            <p className="text-white font-medium">College #{index + 1}</p>
            <button
              onClick={() => removeCollege(index)}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "name",
              "degree",
              "branch",
              "startYear",
              "endYear",
              "cgpa",
              "city",
              "state",
              "description",
            ].map((field) => (
              <div key={field} className="flex flex-col gap-1">

                <label className="text-gray-300 text-sm capitalize">{field}</label>

                <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
                  <span className="text-gray-400 mr-2">{fieldIcon[field]}</span>

                  <input
                    placeholder={field}
                    className="flex-1 bg-transparent text-white outline-none"
                    value={col[field] ?? ""}
                    onChange={(e) => updateCollege(index, field, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addCollege}
        className="mt-3 px-4 py-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
      >
        + Add College
      </button>
    </div>
  );
}