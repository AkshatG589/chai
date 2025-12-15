"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trophy,
  ArrowRight,
  Award,
  Calendar,
  PlusCircle,
  ExternalLink,
  Building2,
} from "lucide-react";

import { getLatestAchievement } from "@/lib/api/achievements";

export default function LatestAchievement({ username, isOwner }) {
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noAchievement, setNoAchievement] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getLatestAchievement(username);

        if (res?.success && res.achievement) {
          setAchievement(res.achievement);
        } else {
          setNoAchievement(true);
        }
      } catch (err) {
        console.error("Latest achievement fetch error:", err);
        setNoAchievement(true);
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
        Loading latest achievement…
      </div>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (noAchievement) {
    return (
      <div
        className="p-10 rounded-2xl bg-white/5 backdrop-blur-md
                   border border-white/10 flex flex-col items-center
                   text-center gap-4"
      >
        <Trophy size={36} className="text-yellow-400" />

        <h2 className="text-xl font-semibold text-white">
          {isOwner ? "No achievements yet" : "No achievements available"}
        </h2>

        <p className="text-gray-400 max-w-sm text-sm">
          {isOwner
            ? "You haven’t added any achievements yet. Showcase your certificates and recognitions."
            : "This user hasn’t published any achievements yet."}
        </p>

        {isOwner && (
          <Link href={`/${username}/achievements`}>
            <button
              className="mt-4 flex items-center gap-2
                         px-6 py-3 rounded-xl
                         bg-gradient-to-r from-yellow-400 to-orange-500
                         text-black font-medium
                         hover:opacity-90 transition shadow-lg"
            >
              <PlusCircle size={18} />
              Add your first achievement
            </button>
          </Link>
        )}
      </div>
    );
  }

  /* ---------------- ACHIEVEMENT CARD ---------------- */
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4 text-white">
        <Trophy size={18} className="text-yellow-400" />
        <h2 className="text-xl font-semibold">Latest Achievement</h2>
      </div>

      {/* IMAGE */}
      {achievement.image && (
        <div className="mb-5 overflow-hidden rounded-xl border border-white/10">
          <img
            src={achievement.image}
            alt={achievement.title}
            className="w-full h-56 object-cover hover:scale-[1.02] transition"
          />
        </div>
      )}

      {/* TITLE */}
      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
        <Award size={20} className="text-yellow-400" />
        {achievement.title}
      </h3>

      {/* ISSUER + YEAR */}
      <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
        {achievement.issuer && (
          <p className="flex items-center gap-2">
            <Building2 size={14} />
            {achievement.issuer}
          </p>
        )}

        {achievement.year && (
          <p className="flex items-center gap-2">
            <Calendar size={14} />
            {achievement.year}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      {achievement.description && (
        <p className="text-gray-300 mt-3 text-sm leading-relaxed">
          {achievement.description}
        </p>
      )}

      {/* CERTIFICATE LINK */}
      {achievement.certificateUrl && (
        <a
          href={achievement.certificateUrl}
          target="_blank"
          className="inline-flex items-center gap-2 mt-5
                     px-4 py-2 rounded-full
                     bg-gradient-to-r from-yellow-400 to-orange-500
                     text-black text-sm font-medium
                     hover:opacity-90 transition"
        >
          <ExternalLink size={16} />
          View Certificate
        </a>
      )}

      {/* SHOW ALL */}
      <Link href={`/${username}/achievements`}>
        <button
          className="mt-8 w-full flex items-center justify-center gap-2
                     px-6 py-3 rounded-xl
                     bg-white/10 border border-white/20
                     text-white font-medium
                     hover:bg-white/20 transition"
        >
          Show all achievements
          <ArrowRight size={18} />
        </button>
      </Link>
    </div>
  );
}