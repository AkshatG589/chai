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
} from "lucide-react";
import { usePathname } from "next/navigation";

import {
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const activeClass =
    "bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1.5 rounded-full flex items-center gap-2";

  const normalClass =
    "hover:text-amber-400 transition flex items-center gap-2";

  return (
    <>
      {/* ✅ MAIN NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/10 backdrop-blur-xl border-b border-white/20 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* ✅ LOGO */}
          <h1 className="text-xl font-bold tracking-wide flex items-center gap-2 text-amber-400">
            <Coffee />
            <Link href="/">Get Me a Chai</Link>
          </h1>

          {/* ✅ DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-sm">

            <Link
              href="/"
              className={pathname === "/" ? activeClass : normalClass}
            >
              <Home size={16} /> Home
            </Link>

            <Link
              href="/about"
              className={pathname === "/about" ? activeClass : normalClass}
            >
              <Info size={16} /> About
            </Link>

            <Link
              href="/services"
              className={pathname === "/services" ? activeClass : normalClass}
            >
              <Briefcase size={16} /> Services
            </Link>

            <Link
              href="/contact"
              className={pathname === "/contact" ? activeClass : normalClass}
            >
              <Phone size={16} /> Contact
            </Link>

            {/* ✅ AUTH */}
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/" />
                <div className="text-xs leading-tight">
                  <p className="font-semibold">{user?.fullName}</p>
                  <p className="text-gray-300">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <SignInButton>
                  <button className="border border-white/30 px-4 py-1.5 rounded-full hover:bg-white/10 transition">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-amber-400 text-black px-4 py-1.5 rounded-full font-semibold hover:scale-105 transition">
                    Signup
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>

          {/* ✅ MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* ✅ BACKDROP */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          {/* ✅ GLASS SLIDE-IN DRAWER (60% WIDTH) */}
          <div className="fixed top-0 right-0 h-full w-[60%] z-50 bg-white/10 backdrop-blur-xl border-l border-white/20 text-white flex flex-col transition-all duration-300">

            {/* ✅ HEADER */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-white/20">
              <div className="flex items-center gap-2 text-amber-400 text-lg font-semibold">
                <Coffee />
                <span>Get Me a Chai</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* ✅ MOBILE NAV LINKS WITH ICONS */}
            <div className="flex flex-col gap-6 px-6 mt-12 text-lg text-left">

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
            </div>

            {/* ✅ AUTH FOOTER */}
            <div className="mt-auto mb-10 px-6 flex flex-col gap-4 items-start">
              {isSignedIn ? (
                <>
                  <UserButton afterSignOutUrl="/" />
                  <div className="text-xs text-gray-300 leading-tight">
                    <p className="font-semibold text-white">{user?.fullName}</p>
                    <p>{user?.primaryEmailAddress?.emailAddress}</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4 w-full">
                  <SignInButton>
                    <button className="border border-white/30 px-5 py-2 rounded-full hover:bg-white/10 transition w-full">
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-amber-400 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition w-full">
                      Signup
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}