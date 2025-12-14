"use client";

import { useEffect, useState } from "react";
import { getLatestProjectByUsername } from "@/lib/api/projects";
import {
  ExternalLink,
  Github,
  Layers,
  Rocket,
  ArrowRight,
  FolderPlus,
} from "lucide-react";
import Link from "next/link";

export default function LatestProject({ username, isOwner }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noProject, setNoProject] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getLatestProjectByUsername(username);

        if (res?.success && res.project) {
          setProject(res.project);
        } else {
          setNoProject(true);
        }
      } catch (err) {
        console.error("Latest project fetch error:", err);
        setNoProject(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [username]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-gray-400">
        Loading latest project…
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (noProject) {
    return (
      <div
        className="p-10 rounded-2xl bg-white/5 backdrop-blur-md
                   border border-white/10 flex flex-col items-center
                   text-center gap-4"
      >
        <Rocket size={36} className="text-purple-400" />

        <h2 className="text-xl font-semibold text-white">
          {isOwner ? "No projects yet" : "No projects available"}
        </h2>

        <p className="text-gray-400 max-w-sm text-sm">
          {isOwner
            ? "You haven’t added any projects yet. Start by creating your first one."
            : "This user hasn’t published any projects yet."}
        </p>

        {isOwner && (
          <Link href={`/${username}/projects`}>
            <button
              className="mt-4 flex items-center gap-2
                         px-6 py-3 rounded-xl
                         bg-gradient-to-r from-purple-500 to-indigo-500
                         text-white font-medium
                         hover:opacity-90 transition shadow-lg"
            >
              <FolderPlus size={18} />
              Create your first project
            </button>
          </Link>
        )}
      </div>
    );
  }

  /* ---------------- PROJECT CARD ---------------- */
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4 text-white">
        <Rocket size={18} />
        <h2 className="text-xl font-semibold">Latest Project</h2>
      </div>

      {/* IMAGE */}
      {project.image && (
        <div className="mb-5 overflow-hidden rounded-xl border border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 object-cover hover:scale-[1.02] transition"
          />
        </div>
      )}

      {/* TITLE */}
      <h3 className="text-2xl font-bold text-white">
        {project.title}
      </h3>

      {/* DESCRIPTION */}
      {project.description && (
        <p className="text-gray-300 mt-2 text-sm leading-relaxed">
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
                className="px-3 py-1 rounded-full text-xs
                           bg-white/10 border border-white/10 text-gray-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* TAGS */}
      {project.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs
                         bg-purple-500/10 border border-purple-500/20
                         text-purple-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* LINKS */}
      <div className="flex gap-4 mt-6">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2
                       rounded-full bg-gradient-to-r
                       from-indigo-500 to-purple-500
                       text-white text-sm font-medium
                       hover:opacity-90 transition"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2
                       rounded-full bg-white/10
                       border border-white/20
                       text-gray-200 text-sm
                       hover:bg-white/20 transition"
          >
            <Github size={16} />
            Code
          </a>
        )}
      </div>

      {/* SHOW ALL */}
      <Link href={`/${username}/projects`}>
        <button
          className="mt-8 w-full flex items-center justify-center gap-2
                     px-6 py-3 rounded-xl
                     bg-white/10 border border-white/20
                     text-white font-medium
                     hover:bg-white/20 transition"
        >
          Show all projects
          <ArrowRight size={18} />
        </button>
      </Link>
    </div>
  );
}