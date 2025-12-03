"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // ✅ Modern icons

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* ✅ Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          <Link href="/">MyWebsite</Link>
        </h1>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-amber-400 transition">
            About
          </Link>
          <Link href="/services" className="hover:text-amber-400 transition">
            Services
          </Link>
          <Link href="/contact" className="hover:text-amber-400 transition">
            Contact
          </Link>

          {/* ✅ Chai Button */}
          <a
            href="https://buymeacoffee.com/"
            target="_blank"
            className="bg-amber-400 text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Get Me a Chai ☕
          </a>
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20 px-6 py-6 flex flex-col gap-5 text-center">
          <Link onClick={() => setOpen(false)} href="/">Home</Link>
          <Link onClick={() => setOpen(false)} href="/about">About</Link>
          <Link onClick={() => setOpen(false)} href="/services">Services</Link>
          <Link onClick={() => setOpen(false)} href="/contact">Contact</Link>

          <a
            href="https://buymeacoffee.com/"
            target="_blank"
            className="bg-amber-400 text-black px-4 py-2 rounded-full font-semibold"
          >
            Get Me a Chai ☕
          </a>
        </div>
      )}
    </nav>
  );
}