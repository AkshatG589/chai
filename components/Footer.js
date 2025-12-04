"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-xl border-t border-white/20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ✅ Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-amber-400">
            <Coffee /> Get Me a Chai
          </h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Supporting creators with clean, modern and scalable web
            experiences built using Next.js & Tailwind CSS.
          </p>
        </div>

        {/* ✅ Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link className="hover:text-amber-400 transition" href="/">Home</Link></li>
            <li><Link className="hover:text-amber-400 transition" href="/about">About</Link></li>
            <li><Link className="hover:text-amber-400 transition" href="/services">Services</Link></li>
            <li><Link className="hover:text-amber-400 transition" href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ✅ Social Links */}
        <div>
          <h3 className="font-semibold mb-3">Connect With Me</h3>

          <div className="flex gap-5">
            <a href="#" className="hover:text-amber-400 transition">
              <Github size={22} />
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              <Linkedin size={22} />
            </a>
            <a href="#" className="hover:text-amber-400 transition">
              <Twitter size={22} />
            </a>
            <a href="mailto:example@gmail.com" className="hover:text-amber-400 transition">
              <Mail size={22} />
            </a>
          </div>

          <p className="mt-4 text-xs text-white/60">
            Let’s build something meaningful together 💜
          </p>
        </div>

      </div>

      {/* ✅ Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Get Me a Chai. All rights reserved.
      </div>
    </footer>
  );
}