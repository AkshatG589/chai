"use client";

import Link from "next/link";
import { Sparkles, Coffee, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="w-full py-20 px-10 flex justify-center items-center ">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* ✅ LEFT: Text Content */}
        <div className="space-y-6 text-center md:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
            bg-gradient-to-r from-purple-500/20 to-blue-500/20 
            border border-purple-500/30 text-purple-300 text-sm">
            <Users size={16} />
            Our Community
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            About Our{" "}
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Chai Community
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            We believe that a simple cup of chai can create powerful connections. Our
            platform lets fans support creators, friends, and loved ones by buying them
            a warm, meaningful chai with just one click.
          </p>

          <Link href="/about">
            <button className="inline-flex items-center gap-3 px-8 py-3 mt-6 rounded-full 
              font-semibold text-white 
              bg-gradient-to-r from-purple-500 to-blue-500 
              hover:scale-105 transition-transform duration-300 
              shadow-lg shadow-purple-500/30">
              Know More <Sparkles size={20} />
            </button>
          </Link>
        </div>

        {/* ✅ RIGHT: Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition">
            <Coffee className="text-purple-400 mb-3" />
            <h3 className="font-semibold mb-1">Meaningful Support</h3>
            <p className="text-sm text-gray-400">
              Support your favorite creators with warmth and appreciation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition">
            <Users className="text-blue-400 mb-3" />
            <h3 className="font-semibold mb-1">Growing Community</h3>
            <p className="text-sm text-gray-400">
              Thousands of chai lovers connecting across the world.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition">
            <Sparkles className="text-purple-400 mb-3" />
            <h3 className="font-semibold mb-1">Boost Morale</h3>
            <p className="text-sm text-gray-400">
              Small gestures that create big smiles and motivation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition">
            <Users className="text-blue-400 mb-3" />
            <h3 className="font-semibold mb-1">Trusted Platform</h3>
            <p className="text-sm text-gray-400">
              Safe, fast and reliable chai gifting experience.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}