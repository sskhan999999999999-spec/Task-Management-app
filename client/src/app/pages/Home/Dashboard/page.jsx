
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Users, FolderKanban, Sparkles } from "lucide-react";
import PieChart from "../../../components/PieChart";

export default function Dashboard() {
  const [data, setData] = useState();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const api_url = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // Current User
    axios
      .get(`https://${api_url}/api/getCurrentUser`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err, "something went wrong while fetching user");
      });

    // All Users
    axios
      .get(`https://${api_url}/api/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setUsers(result.data.users);
      })
      .catch((err) => {
        console.log(err, "something went wrong while fetching users");
      });

    // All Projects
    axios
      .get(`https://${api_url}/api/getAllProjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setProjects(result.data.projects);
      })
      .catch((err) => {
        console.log(err, "something went wrong while fetching projects");
      });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-r from-[#29205f] via-[#202451] to-[#0c3141] px-5 text-white">

      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />

        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />

        <div className="absolute bottom-[-100px] right-[-100px] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      </div>

      {/* Top Left Content */}
      <div className="absolute left-5 top-5 z-10 sm:left-8 sm:top-8">

        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-purple-300">
          <Sparkles size={16} />
          Workspace Dashboard
        </div>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Workspace Overview
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
          Keep track of your team and projects from one central workspace.
        </p>

        <div className="mt-5 h-px w-32 bg-gradient-to-r from-purple-400/60 to-transparent" />

      </div>

      {/* Top Right Stats */}
      <div className="absolute right-5 top-5 z-10 flex gap-4 sm:right-8 sm:top-8">

        {/* task card */}

        <div className="group relative min-w-[190px] overflow-hidden rounded-2xl border border-red-300/30 bg-orange-400 px-7 py-7 shadow-2xl shadow-red-950/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-200/60 hover:bg-orange-400/90">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-300/20 blur-3xl transition group-hover:bg-red-300/30" />

          <div className="relative flex items-center gap-4">

            {/* Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
              <Users size={25} />
            </div>

            {/* Content */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-100">
                Total Users
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                {users.length}
              </p>
            </div>

          </div>
        </div>

        {/* Users Card */}
        <div className="group relative min-w-[190px] overflow-hidden rounded-2xl border border-red-300/30 bg-red-500 px-7 py-7 shadow-2xl shadow-red-950/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-200/60 hover:bg-red-500/90">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-300/20 blur-3xl transition group-hover:bg-red-300/30" />

          <div className="relative flex items-center gap-4">

            {/* Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
              <Users size={25} />
            </div>

            {/* Content */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-100">
                Total Users
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                {users.length}
              </p>
            </div>

          </div>
        </div>

        {/* Projects Card */}
        <div className="group relative min-w-[190px] overflow-hidden rounded-2xl border border-blue-300/30 bg-blue-500 px-7 py-7 shadow-2xl shadow-blue-950/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200/60 hover:bg-blue-500/90">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl transition group-hover:bg-blue-300/30" />

          <div className="relative flex items-center gap-4">

            {/* Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
              <FolderKanban size={25} />
            </div>

            {/* Content */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">
                Total Projects
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                {projects.length}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Pie Chart */}
      <div className="absolute left-5 top-60 z-10 w-[500px] sm:left-8">
        <PieChart />
      </div>

    </main>
  );
}

