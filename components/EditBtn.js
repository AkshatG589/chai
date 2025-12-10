"use client";
import { Pencil } from "lucide-react";

export default function EditBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 text-white transition"
    >
      <Pencil size={18} />
    </button>
  );
}