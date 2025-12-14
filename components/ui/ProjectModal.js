"use client";

import { useState, useEffect } from "react";
import {
  X,
  Image as ImageIcon,
  Link,
  Github,
  Tag,
  Layers,
  FileText,
  Code,
  Plus,
} from "lucide-react";

export default function ProjectModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech: [],
    tags: [],
    link: "",
    github: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  /* 🔒 LOCK BODY SCROLL */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        tech: initialData.tech || [],
        tags: initialData.tags || [],
        link: initialData.link || "",
        github: initialData.github || "",
        image: null,
      });
      setPreview(initialData.image || null);
    } else {
      setPreview(null);
    }
  }, [initialData]);

  if (!open) return null;

  const handleImageChange = (file) => {
    setForm({ ...form, image: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center px-3">

      {/* 🧊 MODAL CONTAINER */}
      <div
        className="relative w-full max-w-xl
                   max-h-[85vh] overflow-y-auto overscroll-contain
                   rounded-2xl bg-white/5 backdrop-blur-xl
                   border border-white/20 shadow-2xl p-6"
      >

        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-6">
          {initialData ? "Edit Project" : "Create New Project"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-5"
        >
          {/* TITLE */}
          <Field
            icon={<FileText size={16} />}
            label="Project Title"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
            placeholder="My Awesome Project"
          />

          {/* DESCRIPTION */}
          <Field
            icon={<Layers size={16} />}
            label="Description"
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
            placeholder="Short project description"
            textarea
          />

          {/* TECH */}
          <ChipInput
            label="Technologies Used"
            icon={<Code size={16} />}
            values={form.tech}
            placeholder="Add technology"
            onAdd={(val) =>
              setForm({ ...form, tech: [...form.tech, val] })
            }
            onRemove={(i) =>
              setForm({
                ...form,
                tech: form.tech.filter((_, idx) => idx !== i),
              })
            }
          />

          {/* TAGS */}
          <ChipInput
            label="Tags"
            icon={<Tag size={16} />}
            values={form.tags}
            placeholder="Add tag"
            onAdd={(val) =>
              setForm({ ...form, tags: [...form.tags, val] })
            }
            onRemove={(i) =>
              setForm({
                ...form,
                tags: form.tags.filter((_, idx) => idx !== i),
              })
            }
          />

          {/* LINKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              icon={<Link size={16} />}
              label="Live URL"
              value={form.link}
              onChange={(v) => setForm({ ...form, link: v })}
              placeholder="https://example.com"
            />
            <Field
              icon={<Github size={16} />}
              label="GitHub URL"
              value={form.github}
              onChange={(v) => setForm({ ...form, github: v })}
              placeholder="https://github.com/..."
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-300 mb-2 flex items-center gap-2">
              <ImageIcon size={16} /> Project Image
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-xl mb-3 border border-white/10"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="w-full text-sm text-gray-300"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- FIELD ---------------- */
function Field({ label, icon, value, onChange, placeholder, textarea }) {
  return (
    <div>
      <label className="text-sm text-gray-300 mb-1 flex items-center gap-2">
        {icon} {label}
      </label>

      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-neutral-800 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-white/20"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-neutral-800 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-white/20"
        />
      )}
    </div>
  );
}

/* ---------------- CHIP INPUT ---------------- */
function ChipInput({ label, icon, values, placeholder, onAdd, onRemove }) {
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <div>
      <label className="text-sm text-gray-300 mb-2 flex items-center gap-2">
        {icon} {label}
      </label>

      <div className="flex flex-wrap gap-2 mb-3">
        {values.map((v, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-neutral-800 rounded-full
                       flex items-center gap-2 border border-neutral-700 text-sm"
          >
            {v}
            <button
              onClick={() => onRemove(i)}
              className="text-red-400 hover:text-red-300"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        {values.length === 0 && (
          <p className="text-gray-500 text-sm">Nothing added yet.</p>
        )}
      </div>

      <div className="flex gap-2">
        <div className="flex items-center bg-neutral-800 px-3 rounded border border-neutral-700 flex-1">
          {icon}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="bg-transparent text-white outline-none flex-1 ml-2"
          />
        </div>

        <button
          type="button"
          onClick={add}
          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}