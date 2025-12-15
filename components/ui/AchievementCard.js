"use client";

import { Pencil, Trash2, Award, ExternalLink } from "lucide-react";

export default function AchievementCard({
  achievement,
  isOwner,
  onEdit,
  onDelete,
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">

      {achievement.image && (
        <img
          src={achievement.image}
          alt={achievement.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}

      <div className="flex justify-between items-start">
        <h2 className="text-xl text-white font-semibold flex items-center gap-2">
          <Award size={18} /> {achievement.title}
        </h2>

        {isOwner && (
          <div className="flex gap-2">
            <button onClick={onEdit} className="p-2 bg-white/10 rounded-lg">
              <Pencil size={16} />
            </button>
            <button onClick={onDelete} className="p-2 bg-red-500/10 rounded-lg">
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        )}
      </div>

      {achievement.issuer && (
        <p className="text-gray-400 text-sm mt-1">
          Issued by {achievement.issuer} ({achievement.year})
        </p>
      )}

      {achievement.description && (
        <p className="text-gray-300 text-sm mt-3">
          {achievement.description}
        </p>
      )}

      {achievement.certificateUrl && (
        <a
          href={achievement.certificateUrl}
          target="_blank"
          className="inline-flex items-center gap-2 mt-4 text-sm text-indigo-400"
        >
          <ExternalLink size={14} />
          View Certificate
        </a>
      )}
    </div>
  );
}