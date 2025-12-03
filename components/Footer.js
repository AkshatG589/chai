"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-xl border-t border-white/20 text-white border-2">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ✅ Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">MyWebsite</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Building clean, modern and scalable web experiences using
            Next.js & Tailwind CSS.
          </p>
        </div>

        {/* ✅ Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link className="hover:text-amber-400" href="/">Home</Link></li>
            <li><Link className="hover:text-amber-400" href="/about">About</Link></li>
            <li><Link className="hover:text-amber-400" href="/services">Services</Link></li>
            <li><Link className="hover:text-amber-400" href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ✅ Social + Chai */}
        <div>
          <h3 className="font-semibold mb-3">Connect With Me</h3>

          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-amber-400"><Github size={20} /></a>
            <a href="#" className="hover:text-amber-400"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-amber-400"><Twitter size={20} /></a>
            <a href="mailto:example@gmail.com" className="hover:text-amber-400">
              <Mail size={20} />
            </a>
          </div>

          <a
            href="https://buymeacoffee.com/"
            target="_blank"
            className="inline-block bg-amber-400 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Get Me a Chai ☕
          </a>
        </div>

      </div>

      {/* ✅ Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
}