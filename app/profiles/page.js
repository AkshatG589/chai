"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  Mail,
  User,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Crown,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

import { getAllClerkUsers } from "@/lib/api/clerkusers";

export default function Page() {
  const { user: clerkUser } = useUser();
  const currentUsername = clerkUser?.username;

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("username");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / limit);

  // 🔄 Fetch users
  useEffect(() => {
    async function loadUsers() {
      setLoading(true);

      const res = await getAllClerkUsers({
        page,
        limit,
        search,
      });

      setUsers(res.users || []);
      setTotal(res.total || 0);
      setLoading(false);
    }

    loadUsers();
  }, [page, limit, search]);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b12] via-[#0f0f1a] to-black" />
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[120px]" />

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3">
          <Users className="text-purple-400" />
          <h1 className="text-3xl font-bold text-white">
            Community Profiles
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-3">

          <div className="flex items-center gap-2 bg-neutral-900 px-3 py-2 rounded-lg border border-white/10 flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder={`Search by ${searchBy}`}
              className="bg-transparent outline-none text-white flex-1"
            />
          </div>

          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="bg-neutral-900 border border-white/10 text-white px-3 py-2 rounded-lg"
          >
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
        </div>

        {/* USERS LIST */}
        {loading ? (
          <div className="p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center text-gray-400 animate-pulse">
            Loading profiles…
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No users found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((u) => {
              const isOwner = currentUsername === u.username;

              return (
                <div
                  key={u.id}
                  className="relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex gap-4 items-center"
                >
                  {/* OWNER BADGE */}
                  {isOwner && (
                    <span
                      className="absolute top-3 right-3 px-3 py-1 rounded-full
                                 text-xs font-semibold flex items-center gap-1
                                 bg-gradient-to-r from-purple-500 to-indigo-500
                                 text-white shadow-lg"
                    >
                      <Crown size={14} />
                      Owner
                    </span>
                  )}

                  {/* AVATAR */}
                  <img
                    src={u.imageUrl}
                    alt={u.username}
                    className="w-16 h-16 rounded-full object-cover border border-white/20"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {u.firstName} {u.lastName}
                    </h3>

                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <User size={14} /> @{u.username}
                    </p>

                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Mail size={14} /> {u.email}
                    </p>

                    {u.extra?.city && (
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <MapPin size={14} />
                        {u.extra.city}, {u.extra.state}, {u.extra.country}
                      </p>
                    )}

                    <Link href={`/${u.username}`}>
                      <button
                        className="mt-3 inline-flex items-center gap-2
                                   px-4 py-2 rounded-lg
                                   bg-white/10 border border-white/20
                                   text-white text-sm
                                   hover:bg-white/20 transition"
                      >
                        Visit Profile
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-white/10 border border-white/20
                         text-white disabled:opacity-40"
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            <p className="text-gray-300 text-sm">
              Page {page} of {totalPages} • Total {total} users
            </p>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-white/10 border border-white/20
                         text-white disabled:opacity-40"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}