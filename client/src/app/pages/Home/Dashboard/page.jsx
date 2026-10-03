"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Users, FolderKanban, Sparkles, CheckCircle2, Clock3, CircleDot } from "lucide-react";
import PieChart from "../../../components/PieChart";

export default function Dashboard() {
  const [data, setData] = useState();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // Current User
    axios
      .get(`${api_url}/api/getCurrentUser`, {
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
      .get(`${api_url}/api/getAllUsers`, {
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
      .get(`${api_url}/api/getAllProjects`, {
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

    // All Tasks
    axios
      .get(`${api_url}/api/getAllTasks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setTasks(result.data.allTasks);
      })
      .catch((err) => {
        console.log(err, "something went wrong while fetching tasks");
      });
  }, []);

  const completedTasks = tasks?.filter(
    (task) => task.status === "completed"
  ).length;

  const inProgressTasks = tasks?.filter(
    (task) => task.status === "In progress"
  ).length;

  const startedTasks = tasks?.filter(
    (task) => task.status === "started"
  ).length;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-linear-to-r from-[#29205f] via-[#202451] to-[#0c3141] px-5 pb-10 pt-20 text-white md:overflow-hidden md:px-5 md:pt-5">

      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />

        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />

        <div className="absolute bottom-[-100px] right-[-100px] h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      </div>

      {/* Main Dashboard Content */}
      <div className="relative z-10">

        {/* Top Content */}
        <div className="sm:left-8 sm:top-8">

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

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:flex">

          {/* Total Users */}
          <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-red-300/30 bg-orange-400 px-5 py-5 shadow-2xl shadow-red-950/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-200/60 hover:bg-orange-400/90 sm:px-7 sm:py-7 lg:min-w-[190px]">

            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-300/20 blur-3xl transition group-hover:bg-red-300/30" />

            <div className="relative flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 sm:h-14 sm:w-14">
                <Users size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-100">
                  Total Users
                </p>

                <p className="mt-1 text-3xl font-bold text-white">
                  {users?.length}
                </p>
              </div>

            </div>
          </div>

          {/* Users Card */}
          <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-red-300/30 bg-red-500 px-5 py-5 shadow-2xl shadow-red-950/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-red-200/60 hover:bg-red-500/90 sm:px-7 sm:py-7 lg:min-w-[190px]">

            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-300/20 blur-3xl transition group-hover:bg-red-300/30" />

            <div className="relative flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 sm:h-14 sm:w-14">
                <Users size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-100">
                  Total Tasks
                </p>

                <p className="mt-1 text-3xl font-bold text-white">
                  {tasks?.length}
                </p>
              </div>

            </div>
          </div>

          {/* Projects Card */}
          <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-blue-300/30 bg-blue-500 px-5 py-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200/60 hover:bg-blue-500/90 sm:px-7 sm:py-7 lg:min-w-[190px]">

            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl transition group-hover:bg-blue-300/30" />

            <div className="relative flex items-center gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 sm:h-14 sm:w-14">
                <FolderKanban size={25} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">
                  Total Projects
                </p>

                <p className="mt-1 text-3xl font-bold text-white">
                  {projects?.length}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Pie Chart + Task Overview */}
        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:mt-12 lg:absolute lg:left-0 lg:top-52 lg:mt-0 lg:grid-cols-[500px_1fr] lg:items-center">

          {/* Pie Chart */}
          <div className="w-full lg:w-[500px]">
            <PieChart />
          </div>

          {/* Task Overview */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl lg:mr-8">

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                    Task Overview
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Task Progress
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <Sparkles size={19} className="text-purple-300" />
                </div>

              </div>

              <div className="mt-6 space-y-3">

                {/* Completed */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:bg-white/[0.07]">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Completed
                      </p>

                      <p className="text-xs text-slate-500">
                        Finished tasks
                      </p>
                    </div>

                  </div>

                  <p className="text-xl font-semibold text-emerald-300">
                    {completedTasks}
                  </p>

                </div>

                {/* In Progress */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:bg-white/[0.07]">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        In Progress
                      </p>

                      <p className="text-xs text-slate-500">
                        Currently active
                      </p>
                    </div>

                  </div>

                  <p className="text-xl font-semibold text-amber-300">
                    {inProgressTasks}
                  </p>

                </div>

                {/* Started */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:bg-white/[0.07]">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <CircleDot size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Started
                      </p>

                      <p className="text-xs text-slate-500">
                        Newly started
                      </p>
                    </div>

                  </div>

                  <p className="text-xl font-semibold text-cyan-300">
                    {startedTasks}
                  </p>

                </div>

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">

                <p className="text-xs text-slate-500">
                  Total workspace tasks
                </p>

                <p className="text-sm font-semibold text-white">
                  {tasks?.length || 0}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}