"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getUser, getPublicExtraProfile } from "@/lib/api/user";

// sections
import UserHero from "@/utility/user/UserHero";
import About from "@/utility/user/sections/About";
import Education from "@/utility/user/sections/Education";
import Skills from "@/utility/user/sections/Skills";
import Links from "@/utility/user/sections/Links";
import Languages from "@/utility/user/sections/Languages";
import Hobbies from "@/utility/user/sections/Hobbies";
import Payments from "@/utility/user/sections/Payments";
import Settings from "@/utility/user/sections/Settings";

import UserSkeleton from "@/components/UserSkeleton";
import NotFound from "@/components/NotFound";

export default function Page({ params }) {
  const resolved = React.use(params); // unwrap params promise
  const username = resolved.username;
  const { getToken } = useAuth();

  const [user, setUser] = useState(null); // clerk + isOwner
  const [extra, setExtra] = useState(null); // public extra profile
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false); // ✅ track 404

  useEffect(() => {
    async function fetchAll() {
      try {
        const token = await getToken({ template: "default" });

        // 1) Clerk user + isOwner
        const userData = await getUser(username, token);

        if (!userData?.user) {
          setNotFound(true); // user doesn't exist
          return;
        }

        setUser(userData);

        // 2) Public Extra profile
        const extraData = await getPublicExtraProfile(username);
        setExtra(extraData?.profile ?? null);

      } catch (err) {
        console.error("Error loading profile:", err);
        setNotFound(true); // show 404 if error occurs
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [username, getToken]);

  // 🔹 Loading skeleton
  if (loading) return <UserSkeleton />;

  // 🔹 User not found
  if (notFound) return <NotFound />;

  return (
    <div className="w-full flex flex-col items-center gap-10 pb-20">

      {/* Hero Section */}
      <UserHero user={user} extra={extra} />

      {/* All Profile Sections (Only show if extra profile exists) */}
      {extra && (
        <div className="w-full max-w-4xl flex flex-col gap-10 px-4">

          <About extra={extra} />

          <Education education={extra.education} />

          <Skills skills={extra.skills} />

          <Languages languages={extra.languages} />

          <Hobbies hobbies={extra.hobbies,user.isOwner} />

          <Links links={extra.links} />

          <Payments payment={extra.payment} />

          <Settings settings={extra.settings} />

        </div>
      )}
    </div>
  );
}