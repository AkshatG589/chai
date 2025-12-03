"use client";

import Link from "next/link";
import { Sparkles, Coffee, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex flex-col justify-center items-center text-center px-10 py-20 relative overflow-hidden">

      {/* Animated Floating Tea Icon */}
      <div className="mb-6 animate-bounce">
        <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30">
          <Coffee size={40} className="text-white" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
        Start Your Day With <br />
        <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Perfect Chai
        </span>
      </h1>

      {/* Paragraph */}
      <p className="mt-6 max-w-2xl text-gray-400 text-sm sm:text-base md:text-lg">
        Freshly brewed chai made with authentic Indian spices. Feel the warmth, aroma,
        and comfort in every sip. Delivered hot and fast to your doorstep.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition-transform duration-300 flex items-center gap-2">
          Order Now <ArrowRight size={18} />
        </button>

        <button className="px-8 py-3 rounded-full font-semibold text-white border border-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300 flex items-center gap-2">
          View Menu <Sparkles size={18} />
        </button>
      </div>

    </section>
  );
}