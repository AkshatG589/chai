"use client";

import React from "react";

export default function SkeletonBlocks({
  rows = 3,              // number of small block rows (you can increase)
  cols = 2,              // number of columns for small blocks on md+ screens
  className = "",        // extra wrapper classes if you need
}) {
  // Create an array for mapping small blocks
  const smallCount = rows * cols;
  const smallBlocks = Array.from({ length: smallCount });

  return (
    <div
      className={`w-full space-y-6 animate-pulse ${className}`}
      aria-busy="true"
      aria-label="Loading content"
    >
      {/* Large hero/full-width box (~30vh) */}
      <div className="w-full h-[30vh] rounded-lg bg-gray-200 dark:bg-gray-700" />

      {/* Grid of smaller blocks */}
      <div className={`grid gap-4 ${cols === 1 ? "grid-cols-1" : `grid-cols-1 md:grid-cols-${cols}`}`}>
        {smallBlocks.map((_, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            {/* avatar placeholder */}
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />

            {/* text placeholders: two/three lines */}
            <div className="w-full">
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 mb-2 w-3/4" />
              <div className="h-3 rounded bg-gray-200 dark:bg-gray-700 mb-2 w-1/2" />
              {/* optional third small line */}
              <div className="h-2 rounded bg-gray-200 dark:bg-gray-700 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}