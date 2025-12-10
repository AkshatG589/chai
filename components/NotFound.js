"use client";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center
      bg-black/0 backdrop-blur-sm">

      <div className="text-center px-6 py-10 rounded-2xl
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-xl max-w-lg w-full">

        <h1 className="text-6xl font-bold text-white mb-4">
          404
        </h1>

        <p className="text-gray-300 text-xl mb-6">
          The page you are looking for does not exist.
        </p>

        <a
          href="/"
          className="px-6 py-2 rounded-lg bg-white/20 
          text-white hover:bg-white/30 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}