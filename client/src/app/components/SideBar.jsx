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
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {

  const [data, setData] = useState();

  const pathname = usePathname()

  const isActive = (path) =>
  pathname === path
    ? "relative flex w-full items-center gap-3 overflow-hidden rounded-xl border border-indigo-400/20 bg-indigo-500/[0.12] px-4 py-2.5 text-sm font-medium text-indigo-100 shadow-[0_4px_20px_rgba(99,102,241,0.08)] backdrop-blur-xl transition-all duration-300 before:absolute before:left-0 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-cyan-300 before:shadow-[0_0_10px_rgba(103,232,249,0.7)]"
    : "flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium text-gray-400 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-gray-200";
  
  
  
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
            className={isActive("/pages/Home/Dashboard")}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </Link>


          {/* Projects */}
          <Link
            href="/pages/Home/Projects"
            className={isActive("/pages/Home/Projects")}
          >
            <FolderKanban size={19} />
            Projects
          </Link>


          {/* Tasks */}
          <Link
            href="/pages/Home/Tasks"
            className={isActive("/pages/Home/Tasks")}
          >
            <CheckSquare size={19} />
            Tasks
          </Link>


          {/* Users */}
          <Link
            href="/pages/Home/Users"
            className={isActive("/pages/Home/Users")}
          >
            <Users size={19} />
            Users
          </Link>

        

          
         

        </div>
      </nav>


      {/* Bottom */}
   
<div className="border-t border-white/[0.08] pt-4">

  {/* User Profile Card */}
  <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3 backdrop-blur-2xl transition-all duration-300 hover:border-indigo-400/20 hover:bg-white/[0.055]">

    {/* Subtle Ethereal Glow */}
    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/10" />

    <div className="relative flex items-center gap-3">

      {/* Avatar */}
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/80 to-cyan-400/60 text-white shadow-lg shadow-indigo-500/10">
        <User size={19} strokeWidth={2} />

        {/* Online Indicator */}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#10131f] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
      </div>

      {/* User Info */}
      <div className="min-w-0 flex-1">

        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold tracking-wide text-white">
            {data?.user?.username || "User"}
          </p>

          {/* Role Badge */}
          <span className="shrink-0 rounded-md border border-indigo-400/20 bg-indigo-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-indigo-300">
            {data?.user?.role || "User"}
          </span>
        </div>

        {/* Status */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          <span className="text-[11px] text-gray-500">
            Active now
          </span>
        </div>

      </div>
    </div>
  </div>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="group mt-2 flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm text-gray-400 transition-all duration-300 hover:border-red-400/10 hover:bg-red-500/[0.06] hover:text-red-300"
  >
    <LogOut
      size={18}
      className="transition-transform duration-300 group-hover:-translate-x-0.5"
    />

    <span className="font-medium">
      Sign out
    </span>

    <span className="ml-auto text-[10px] text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      Logout
    </span>
  </button>

</div>



    </aside>
  );
}