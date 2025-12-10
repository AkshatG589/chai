"use client";

import React from "react";

export default function UserSkeleton() {
  return (
    <div className="w-full flex flex-col items-center gap-10 pb-20 animate-pulse">

      {/* Hero Skeleton */}
      <div className="relative w-full h-[32vh] bg-white/5 rounded-b-3xl">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        {/* Profile image skeleton */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-white/10" />
        </div>
      </div>

      {/* Name & Username skeleton */}
      <div className="mt-20 w-full max-w-md flex flex-col items-center text-center gap-3">
        <div className="h-6 w-40 bg-white/10 rounded" />
        <div className="h-4 w-28 bg-white/10 rounded" />
        <div className="h-4 w-32 bg-white/10 rounded" />
      </div>

      {/* All sections skeleton */}
      <div className="w-full max-w-4xl flex flex-col gap-10 px-4">

        {[
          "About",
          "Education",
          "Skills",
          "Languages",
          "Hobbies",
          "Social Links",
          "Payments",
          "Settings",
        ].map((section, index) => (
          <SectionSkeleton key={index} title={section} />
        ))}

      </div>
    </div>
  );
}

/* -------------------------------------------
   🔹 Section skeleton block component
-------------------------------------------- */

function SectionSkeleton({ title }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      {/* Section Title */}
      <div className="h-5 w-36 bg-white/10 rounded mb-5"></div>

      {/* Content lines */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-white/10 rounded"></div>
        <div className="h-4 w-5/6 bg-white/10 rounded"></div>
        <div className="h-4 w-4/6 bg-white/10 rounded"></div>
        <div className="h-4 w-3/6 bg-white/10 rounded"></div>
      </div>
    </div>
  );
}