"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Coffee,
  Home,
  Info,
  Briefcase,
  Phone,
  Wallet,
  UserCircle,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  useUser,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const username = user?.username;

  const activeClass =
    "bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1.5 rounded-full flex items-center gap-2";

  const normalClass =
    "hover:text-amber-400 transition flex items-center gap-2";

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/10 backdrop-blur-xl border-b border-white/20 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <h1 className="text-xl font-bold tracking-wide flex items-center gap-2 text-amber-400">
            <Coffee />
            <Link href="/">Get Me a Chai</Link>
          </h1>

          {/* DESKTOP MENU (ONLY ON LG+) */}
          <div className="hidden lg:flex items-center gap-8 text-sm">

            <Link href="/" className={pathname === "/" ? activeClass : normalClass}>
              <Home size={16} /> Home
            </Link>

            <Link href="/about" className={pathname === "/about" ? activeClass : normalClass}>
              <Info size={16} /> About
            </Link>

            <Link href="/services" className={pathname === "/services" ? activeClass : normalClass}>
              <Briefcase size={16} /> Services
            </Link>

            <Link href="/contact" className={pathname === "/contact" ? activeClass : normalClass}>
              <Phone size={16} /> Contact
            </Link>

            {/* ⭐ My Payments */}
            {isSignedIn && (
              <button
                onClick={() => router.push(`/${username}/payments`)}
                className={
                  pathname === `/${username}/payments`
                    ? activeClass
                    : normalClass
                }
              >
                <Wallet size={18} /> My Payments
              </button>
            )}
          </div>

          {/* MENU BUTTON (SM, MD, LG) */}
          <button onClick={() => setOpen(true)} className="lg:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* BACKDROP + DRAWER */}
      {open && (
        <>
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          {/* SLIDE DRAWER */}
          <div className="fixed top-0 right-0 h-full w-[70%] sm:w-[60%] md:w-[40%] z-50 bg-white/10 backdrop-blur-xl border-l border-white/20 text-white flex flex-col transition-all duration-300">

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/20">
              <div className="flex items-center gap-2 text-amber-400 text-lg font-semibold">
                <Coffee />
                <span>Get Me a Chai</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* NAV LINKS */}
            <div className="flex flex-col gap-6 px-6 mt-12 text-lg">

              <Link
                onClick={() => setOpen(false)}
                href="/"
                className={pathname === "/" ? activeClass : normalClass}
              >
                <Home /> Home
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/about"
                className={pathname === "/about" ? activeClass : normalClass}
              >
                <Info /> About
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/services"
                className={pathname === "/services" ? activeClass : normalClass}
              >
                <Briefcase /> Services
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/contact"
                className={pathname === "/contact" ? activeClass : normalClass}
              >
                <Phone /> Contact
              </Link>

              {/* ⭐ My Payments */}
              {isSignedIn && (
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push(`/${username}/payments`);
                  }}
                  className={
                    pathname === `/${username}/payments`
                      ? activeClass
                      : normalClass
                  }
                >
                  <Wallet /> My Payments
                </button>
              )}
            </div>

            {/* ⭐ USER FOOTER */}
            {isSignedIn && (
              <div className="mt-auto px-6 mb-10">
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push(`/${username}`);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/20 w-full"
                >
                  <UserCircle size={26} />
                  <div>
                    <p className="font-semibold text-white">{user.fullName}</p>
                    <p className="text-gray-300 text-sm">@{username}</p>
                  </div>
                </button>
              </div>
            )}

            {/* AUTH FOOTER */}
            {!isSignedIn && (
              <div className="mt-auto mb-10 px-6 flex flex-col gap-4">
                <SignInButton>
                  <button className="border border-white/30 px-5 py-2 rounded-full hover:bg-white/10 transition">
                    Login
                  </button>
                </SignInButton>

                <SignUpButton>
                  <button className="bg-amber-400 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
                    Signup
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}