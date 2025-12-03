"use client";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen justify-center items-center">

      {/* ✅ Light smoky wrapper (no redesign) */}
      <div className="">
        <SignUp
          afterSignUpUrl="/"
          appearance={{
            elements: {
              // ✅ Main card (removes white background)
              card: "bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 w-full",

              // ✅ Labels & text
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
              formFieldLabel: "text-gray-300",

              // ✅ Inputs (smoky + transparent)
              formFieldInput:"bg-white/10 text-white border border-white/30 focus:border-white placeholder:text-gray-300 placeholder:opacity-100",

              // ✅ Footer text
              footerActionText: "text-black",
              footerActionLink:"text-black font-semibold",

              // ✅ Social buttons (if enabled)
              socialButtonsBlockButton:
                "bg-white/10 text-white border border-white/30 hover:bg-white/20",

              // ✅ Main submit button
              formButtonPrimary:
                "bg-white/90 text-black hover:bg-white",
            },
          }}
        />
      </div>
    </div>
  );
}