"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  createAchievement,
  getAchievementsByUsername,
  updateAchievement,
  deleteAchievement,
} from "@/lib/api/achievements";
import { getUser } from "@/lib/api/user";

import AchievementCard from "@/components/ui/AchievementCard";
import AchievementModal from "@/components/ui/AchievementModal";
import { Plus } from "lucide-react";

export default function page({ params }) {
  const resolved = React.use(params);
  const username = resolved.username;

  const { getToken } = useAuth();

  const [achievements, setAchievements] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --------------------------------------------------
  // LOAD USER + ACHIEVEMENTS
  // --------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const token = await getToken();

        const userRes = await getUser(username, token);
        setIsOwner(Boolean(userRes?.isOwner));

        const res = await getAchievementsByUsername(username);
        setAchievements(res?.achievements || []);
      } catch (err) {
        console.error("Load achievements error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [username, getToken]);

  // --------------------------------------------------
  // CREATE / UPDATE
  // --------------------------------------------------
  const handleSave = async (form) => {
    try {
      setSaving(true);
      const token = await getToken();

      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (!value) return;
        fd.append(key, value);
      });

      if (editing) {
        await updateAchievement(editing._id, fd, token);
      } else {
        await createAchievement(fd, token);
      }

      const refreshed = await getAchievementsByUsername(username);
      setAchievements(refreshed?.achievements || []);

      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.error("Save achievement error:", err);
      alert("Failed to save achievement.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------
  const handleDelete = async (achievement) => {
    if (!confirm("Delete this achievement?")) return;

    try {
      const token = await getToken();
      await deleteAchievement(achievement._id, token);

      setAchievements((prev) =>
        prev.filter((a) => a._id !== achievement._id)
      );
    } catch (err) {
      console.error("Delete achievement error:", err);
      alert("Failed to delete achievement.");
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b12] via-[#0f0f1a] to-black" />

      <div className="relative max-w-6xl mx-auto px-4 py-12">
<div className="mb-10 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-all">
    @{username}&apos;s Achievements
  </h1>

  {isOwner && (
    <button
      onClick={() => setModalOpen(true)}
      className="
        flex items-center justify-center gap-2
        px-4 py-2 sm:px-5 sm:py-2.5
        text-sm sm:text-base
        rounded-full
        bg-gradient-to-r from-purple-500 to-indigo-500
        text-white font-medium
        hover:opacity-90 transition
        w-full sm:w-auto
      "
    >
      <Plus size={16} />
      <span className="whitespace-nowrap">New Achievement</span>
    </button>
  )}
</div>

        {loading && (
          <div className="p-10 rounded-2xl bg-white/5 text-center text-gray-400">
            Loading achievements...
          </div>
        )}

        {!loading && achievements.length === 0 && (
          <div className="p-10 rounded-2xl bg-white/5 text-center text-gray-400">
            No achievements added yet.
          </div>
        )}

        {!loading && achievements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((a) => (
              <AchievementCard
                key={a._id}
                achievement={a}
                isOwner={isOwner}
                onEdit={() => {
                  setEditing(a);
                  setModalOpen(true);
                }}
                onDelete={() => handleDelete(a)}
              />
            ))}
          </div>
        )}

        <AchievementModal
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