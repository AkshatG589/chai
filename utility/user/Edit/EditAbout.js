"use client";

import { Calendar, Globe, MapPin, User } from "lucide-react";

export default function EditAbout({ form, setForm }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">

      <h3 className="text-lg text-white font-semibold mb-4">About</h3>

      <div className="flex flex-col gap-5">

        {/* BIO — now textarea */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Bio</label>
          <div className="flex items-start bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <User size={18} className="text-gray-400 mt-1 mr-2" />

            <textarea
              placeholder="Write something about yourself..."
              className="flex-1 bg-transparent text-white outline-none resize-none h-24"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
        </div>

        {/* CITY / STATE / COUNTRY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* CITY */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">City</label>
            <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="City"
                className="flex-1 bg-transparent text-white outline-none"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
          </div>

          {/* STATE */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">State</label>
            <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
              <Globe size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="State"
                className="flex-1 bg-transparent text-white outline-none"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
            </div>
          </div>

          {/* COUNTRY */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">Country</label>
            <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
              <Globe size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Country"
                className="flex-1 bg-transparent text-white outline-none"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* DOB FIELD */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-sm">Date of Birth</label>
          <div className="flex items-center bg-neutral-800 px-3 py-2 rounded border border-neutral-700">
            <Calendar size={18} className="text-gray-400 mr-2" />
            <input
              type="date"
              className="flex-1 bg-transparent text-white outline-none"
              value={
                form.dob
                  ? new Date(form.dob).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </div>
        </div>

      </div>
    </div>
  );
}