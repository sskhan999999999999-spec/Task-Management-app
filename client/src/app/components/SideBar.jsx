"use client";

import axios from "axios";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Shuffle,
  Settings,
  LogOut,
  Bot,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {

  const [data, setData] = useState();
  
      useEffect(() => {
       const accessToken = localStorage.getItem("accessToken")
          axios.get("http://localhost:8000/api/getCurrentUser", {
            headers:{
              Authorization:`Bearer ${accessToken}`
            }
          })
          .then(result => {
              console.log(result.data);
              setData(result.data);
          })
          .catch(err => {
              console.log(err, "something went wrong while fetching user");
          });
      }, []);

      const handleLogout = ()=>{
        axios.post("http://localhost:8000/api/")
      }
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#11152a]/80 p-5 text-white backdrop-blur-xl">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <h1 className="text-3xl font-light text-[#d2c2ff]">
          Aether Task
        </h1>
      </div>


      {/* Navigation */}
      <nav className="flex-1">

        <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-widest text-gray-500">
          Workspace
        </p>

        <div className="space-y-1">

          {/* Dashboard */}
          <Link
            href="/pages/Home/Dashboard"
            className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 text-sm font-medium transition hover:bg-white/15"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </Link>


          {/* Projects */}
          <Link
            href="/pages/Home/Projects"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <FolderKanban size={19} />
            Projects
          </Link>


          {/* Tasks */}
          <Link
            href="/pages/Home/Tasks"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <CheckSquare size={19} />
            Tasks
          </Link>


          {/* Users */}
          <Link
            href="/pages/Home/Users"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <Users size={19} />
            Users
          </Link>

        

          
         

        </div>
      </nav>


      {/* Bottom */}
      <div className="border-t border-white/10 pt-4">

              <div
        className="mb-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08]"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500/80 to-cyan-400/70 text-white shadow-lg shadow-indigo-500/10">
          <User size={18} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xl font-semibold text-white">
            {data?.user?.username}
          </p>
          <p className="text-[11px] text-gray-500">
            Logged in

          </p>
           <p className="truncate text-xl bg-indigo-600 font-semibold text-white">
            {data?.user?.role}
          </p>
        </div>
      </div>

        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={19} />
          Logout
        </button>

      </div>

    </aside>
  );
}