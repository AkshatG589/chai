"use client";

import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  Youtube,
} from "lucide-react";

export default function EditLinks({ form, setForm }) {
  const links = form.links ?? {};

  const fields = [
    { key: "github", label: "GitHub", icon: <Github size={18} /> },
    { key: "linkedin", label: "LinkedIn", icon: <Linkedin size={18} /> },
    { key: "instagram", label: "Instagram", icon: <Instagram size={18} /> },
    { key: "twitter", label: "Twitter", icon: <Twitter size={18} /> },
    { key: "website", label: "Website", icon: <Globe size={18} /> },
    { key: "youtube", label: "YouTube", icon: <Youtube size={18} /> },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">

      <h3 className="text-lg text-white font-semibold mb-4">
        Social Links
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, icon }) => (
          <div key={key} className="flex flex-col gap-1">

            {/* Label */}
            <label className="text-gray-300 text-sm">{label}</label>

            {/* Input with Icon */}
            <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
              <span className="text-gray-400 mr-2">{icon}</span>

              <input
                type="text"
                placeholder={`Enter ${label}`}
                className="flex-1 bg-transparent text-white outline-none"
                value={links[key] || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    links: {
                      ...links,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}