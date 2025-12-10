"use client";

import { Github, Linkedin, Instagram, Twitter, Globe, Youtube } from "lucide-react";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  website: Globe,
  youtube: Youtube,
};

export default function Links({ links }) {
  if (!links) return null;

  const entries = Object.entries(links).filter(([_, value]) => value);

  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
      <h2 className="text-xl text-white font-semibold mb-4">Social Links</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.map(([key, value]) => {
          const Icon = iconMap[key] || Globe;

          return (
            <a
              key={key}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition">
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex flex-col">
                <span className="text-gray-300 text-sm group-hover:text-white transition">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>

                <span className="text-gray-500 text-xs truncate max-w-[200px] group-hover:text-gray-300 transition">
                  {value}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}