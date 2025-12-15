"use client";

import { useEffect, useState } from "react";
import {
  X,
  Image as ImageIcon,
  FileText,
  Award,
  Calendar,
  Link,
} from "lucide-react";

export default function AchievementModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    year: "",
    certificateUrl: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  /* 🔒 LOCK BACKGROUND SCROLL */
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
        issuer: initialData.issuer || "",
        year: initialData.year || "",
        certificateUrl: initialData.certificateUrl || "",
        description: initialData.description || "",
        image: null,
      });
      setPreview(initialData.image || null);
    } else {
      setPreview(null);
    }
  }, [initialData]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-black/70 backdrop-blur-md
        overflow-y-auto overscroll-contain
        px-3 py-6
      "
    >
      {/* MODAL */}
      <div
        className="
          relative w-full max-w-lg mx-auto
          bg-white/5 backdrop-blur-xl
          rounded-2xl border border-white/20
          p-6
          max-h-[90vh] overflow-y-auto
        "
      >
        {/* ❌ CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl text-white mb-6">
          {initialData ? "Edit Achievement" : "Add Achievement"}
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
            label="Achievement Title"
            icon={<Award size={16} />}
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
            placeholder="AWS Certified Developer"
            required
          />

          {/* ISSUER */}
          <Field
            label="Issued By"
            icon={<FileText size={16} />}
            value={form.issuer}
            onChange={(v) => setForm({ ...form, issuer: v })}
            placeholder="Amazon, Coursera, College"
          />

          {/* YEAR */}
          <Field
            label="Year"
            icon={<Calendar size={16} />}
            type="number"
            value={form.year}
            onChange={(v) => setForm({ ...form, year: v })}
            placeholder="2024"
          />

          {/* DESCRIPTION */}
          <Field
            label="Description"
            icon={<FileText size={16} />}
            value={form.description}
            onChange={(v) =>
              setForm({ ...form, description: v })
            }
            placeholder="Brief details about this achievement"
            textarea
          />

          {/* CERTIFICATE URL */}
          <Field
            label="Certificate URL"
            icon={<Link size={16} />}
            value={form.certificateUrl}
            onChange={(v) =>
              setForm({ ...form, certificateUrl: v })
            }
            placeholder="https://certificate-link"
          />

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-300 mb-2 flex items-center gap-2">
              <ImageIcon size={16} /> Achievement Image
            </label>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-36 object-cover rounded-xl mb-3 border border-white/10"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setForm({ ...form, image: file });
                setPreview(URL.createObjectURL(file));
              }}
              className="w-full text-sm text-gray-300"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-6 sticky bottom-0 bg-transparent">
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
              {loading ? "Saving..." : "Save Achievement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------- FIELD COMPONENT ---------------- */
function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  textarea,
  type = "text",
  required = false,
}) {
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
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full bg-neutral-800 border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-white/20"
        />
      )}
    </div>
  );
}