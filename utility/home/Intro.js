"use client";

import { Heart, Gift, Coffee } from "lucide-react";

export default function Intro() {
  return (
    <section className="py-20 px-10 text-center">

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
        Your Fans Can Buy You a{" "}
        <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Chai
        </span>
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Card 1 */}
        <div className="p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-xl shadow-purple-500/40">
            <Coffee size={35} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Get Support Instantly
          </h3>
          <p className="text-gray-400 text-sm">
            Your fans can show instant love by buying you a simple chai anytime.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-xl shadow-purple-500/40">
            <Heart size={35} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Build Real Connections
          </h3>
          <p className="text-gray-400 text-sm">
            Every chai represents appreciation, love, and emotional support from fans.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300">
          <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-xl shadow-purple-500/40">
            <Gift size={35} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Monetize Your Content
          </h3>
          <p className="text-gray-400 text-sm">
            Turn your audience support into earnings with simple chai contributions.
          </p>
        </div>

      </div>
    </section>
  );
}