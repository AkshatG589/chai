"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  createProject,
  getProjectsByUsername,
  updateProject,
  deleteProject,
} from "@/lib/api/projects";
import { getUser } from "@/lib/api/user";

import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { Plus } from "lucide-react";

export default function ProjectsPage({ params }) {
  const resolved = React.use(params);
  const username = resolved.username;

  const { getToken } = useAuth();

  const [projects, setProjects] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --------------------------------------------------
  // LOAD USER + PROJECTS
  // --------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const token = await getToken();

        const userRes = await getUser(username, token);
        setIsOwner(Boolean(userRes?.isOwner));

        const projectRes = await getProjectsByUsername(username);
        setProjects(projectRes?.projects || []);
      } catch (err) {
        console.error("Load projects error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [username, getToken]);

  // --------------------------------------------------
  // CREATE / UPDATE PROJECT
  // --------------------------------------------------
  const handleSave = async (form) => {
    try {
      setSaving(true);
      const token = await getToken();

      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value === null || value === "" || value === undefined) return;

        // tech & tags are ARRAYS now
        if (key === "tech" || key === "tags") {
          fd.append(key, JSON.stringify(value));
        } else {
          fd.append(key, value);
        }
      });

      if (editing) {
        await updateProject(username, editing._id, fd, token);
      } else {
        await createProject(fd, token);
      }

      const refreshed = await getProjectsByUsername(username);
      setProjects(refreshed?.projects || []);

      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Save project error:", err);
      alert("Something went wrong while saving the project.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // DELETE PROJECT
  // --------------------------------------------------
  const handleDelete = async (project) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = await getToken();
      await deleteProject(username, project._id, token);

      setProjects((prev) => prev.filter((p) => p._id !== project._id));
    } catch (err) {
      console.error("Delete project error:", err);
      alert("Failed to delete project.");
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* 🌌 BACKGROUND GRADIENT (always visible) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b12] via-[#0f0f1a] to-black" />

      {/* ✨ SOFT GLOW */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[120px]" />

      {/* 🧊 CONTENT */}
      <div className="relative max-w-6xl mx-auto px-4 py-12">

        {/* GLASS HEADER */}
        <div className="mb-10 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            @{username}&apos;s Projects
          </h1>

          {isOwner && (
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full
                         bg-gradient-to-r from-purple-500 to-indigo-500
                         text-white font-medium
                         hover:opacity-90 transition"
            >
              <Plus size={16} />
              New Project
            </button>
          )}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center text-gray-400 animate-pulse">
            Loading projects...
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && projects.length === 0 && (
          <div className="p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center text-gray-400">
            No projects yet.
          </div>
        )}

        {/* PROJECT GRID */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                isOwner={isOwner}
                onEdit={(p) => {
                  setEditing(p);
                  setModalOpen(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* MODAL */}
        <ProjectModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSave}
          initialData={editing}
          loading={saving}
        />
      </div>
    </div>
  );
}