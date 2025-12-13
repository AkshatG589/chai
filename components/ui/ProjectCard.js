"use client";

import {
  ExternalLink,
  Github,
  Pencil,
  Trash2,
  Layers,
  Code,
} from "lucide-react";

export default function ProjectCard({
  project,
  isOwner,
  onEdit,
  onDelete,
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg transition hover:bg-white/10">

      {/* IMAGE */}
      {project.image && (
        <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-start gap-4">
        <h2 className="text-xl font-semibold text-white">
          {project.title}
        </h2>

        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              title="Edit"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => onDelete(project)}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition"
              title="Delete"
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      {project.description && (
        <p className="text-gray-300 text-sm mt-2 leading-relaxed">
          {project.description}
        </p>
      )}

      {/* TECH STACK */}
      {project.tech?.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
            <Layers size={14} />
            Tech Stack
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-gray-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA BUTTONS */}
      <div className="flex gap-4 mt-6">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            className="flex items-center gap-2 px-6 py-2 rounded-full
                       bg-gradient-to-r from-purple-500 to-indigo-500
                       text-white font-medium text-sm
                       hover:opacity-90 transition"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}

        {project.github && project.github !== "N/A" && (
          <a
            href={project.github}
            target="_blank"
            className="flex items-center gap-2 px-6 py-2 rounded-full
                       border border-white/20
                       bg-white/5 backdrop-blur-md
                       text-white text-sm
                       hover:bg-white/10 transition"
          >
            <Code size={16} />
            Code
          </a>
        )}
      </div>
    </div>
  );
}