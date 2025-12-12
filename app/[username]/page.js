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

// MASTER EDIT MODAL
import EditProfileModal from "@/utility/user/Edit/EditProfileModal";

export default function Page({ params }) {
  const resolved = React.use(params);
  const username = resolved.username;
  const { getToken } = useAuth();

  const [user, setUser] = useState(null);
  const [extra, setExtra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // 🔥 Global edit modal controller
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        const token = await getToken({ template: "default" });

        const userData = await getUser(username, token);
        if (!userData?.user) {
          setNotFound(true);
          return;
        }
        setUser(userData);

        const extraData = await getPublicExtraProfile(username);
        setExtra(extraData?.profile ?? null);

      } catch (err) {
        console.error("Error loading profile:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [username, getToken]);

  if (loading) return <UserSkeleton />;
  if (notFound) return <NotFound />;

  return (
    <div className="w-full flex flex-col items-center gap-10 pb-20">

      {/* 🔥 EDIT MODAL (global) */}
      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        data={extra}
      />

      {/* Hero Section */}
      <UserHero user={user} extra={extra} />

      {/* Profile Sections */}
      <div className="w-full max-w-4xl flex flex-col gap-10 px-4">

        {/* 🔥 About should ALWAYS render (extra may be null) */}
        <About
          extra={extra}
          isOwner={user.isOwner}
          onEditOpen={() => setEditOpen(true)}
        />

        {/* Only render these sections if extra exists */}
        {extra && (
          <>
            <Education education={extra.education} />
            <Skills skills={extra.skills} />
            <Languages languages={extra.languages} />
            <Hobbies hobbies={extra.hobbies} />
            <Links links={extra.links} />
            <Payments payment={extra.payment} username={user.user.username} />
            <Settings settings={extra.settings} />
          </>
        )}
      </div>
    </div>
  );
}