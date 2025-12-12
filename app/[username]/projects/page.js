"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { createProject, getProjectsByUsername } from "@/lib/api/projects";

export default function page({ params }) {
  const resolved = React.use(params);
  const username = resolved.username;
  
  const { getToken } = useAuth();

  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");
  const [github, setGithub] = useState("");
  const [image, setImage] = useState(null);

  // Fetch projects using username param
  const fetchProjects = async () => {
    if (!username) return;

    try {
      const data = await getProjectsByUsername(username);
      setProjects(data?.projects || []);
      alert(data.data.success)
    } catch (err) {
      console.error("Error loading projects:", err);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [username]);

  // Submit project (authenticated)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken(); // Clerk token

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tech", JSON.stringify(tech.split(",")));
      formData.append("tags", JSON.stringify(tags.split(",")));
      formData.append("link", link);
      formData.append("github", github);
      if (image) formData.append("image", image);

      await createProject(formData, token);

      await fetchProjects();
      setModal(false);
      resetForm();
    } catch (err) {
      console.error("Create Project Error:", err);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTech("");
    setTags("");
    setLink("");
    setGithub("");
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-gray-200 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {username}&apos;s Projects
          </h1>

          <button
            onClick={() => setModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md text-white"
          >
            + Create New Project
          </button>
        </div>

        {/* Project List */}
        {projects.length === 0 ? (
          <p className="text-gray-400">No projects yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div
                key={p._id}
                className="bg-[#15151c] border border-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition"
              >
                {p.image && (
                  <img
                    src={p.image}
                    className="w-full h-48 object-cover rounded-md mb-3"
                    alt="project"
                  />
                )}

                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="text-gray-400 text-sm mt-1">{p.description}</p>

                <div className="mt-2 flex gap-2 flex-wrap">
                  {p.tech?.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-800 rounded text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex gap-3 text-sm">
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      className="text-blue-400 hover:underline"
                    >
                      Live →
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      className="text-gray-400 hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- MODAL ---------------- */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a22] p-6 w-full max-w-lg rounded-lg shadow-lg border border-gray-700">

            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Title"
                className="w-full bg-[#111118] border border-gray-700 p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Description"
                className="w-full bg-[#111118] border border-gray-700 p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                className="w-full bg-[#111118] border border-gray-700 p-2 rounded"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
              />

              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="w-full bg-[#111118] border border-gray-700 p-2 rounded"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <input
                type="text"
                placeholder="Live Link"
                className="w-full bg-[#111118] border border-gray-700 p-2 rounded"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <input
                type="text"
                placeholder="GitHub Link"
                className="w-full bg-[#111118] border border-gray-700 p-2 rounded"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                className="w-full bg-[#111118] border border-gray-700 p-2 rounded"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
                >
                  {loading ? "Saving..." : "Save Project"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}