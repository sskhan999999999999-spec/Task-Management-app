"use client";

import axios from "axios";
import {
  X,
  FolderKanban,
  Search,
  Plus,
  MoreHorizontal,
  CalendarDays,
  Flag,
  CircleDot,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";


const Socket = io(process.env.NEXT_PUBLIC_API_URL,{
    withCredentials: true
  })
function Page() {
  const [modal, setModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [data, setData] = useState({
    name: "",
    description: "",
    status: "",
    startDate: "",
    endDate: "",
    priority: "",
  });

  const api_url = process.env.NEXT_PUBLIC_API_URL
  useEffect(()=>{
      Socket.on("connect",()=>{
        console.log("socket connected",Socket.id)
        
      })
      return ()=>{
        Socket.off("connect")
      }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModal = () => {
    setModal(!modal);
  };

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const accessToken = localStorage.getItem("accessToken");

      const result = await axios.get(
        `http://${api_url}/api/getAllProjects`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProjects(result.data.projects);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{

      const handleNewProject = ()=>{
        console.log("New Project recieved from socket");
        fetchProjects()
      }

      Socket.on("newProject",handleNewProject)

      return ()=>{
        Socket.off("newProject",handleNewProject)
      }

  },[])

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.post(
        `http://${api_url}/api/create-project`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      await fetchProjects();

      setData({
        name: "",
        description: "",
        status: "",
        startDate: "",
        endDate: "",
        priority: "",
      });

      setModal(false);
    } catch (err) {
      console.log(
        err.response?.data || err.message,
        "something went wrong while creating project"
      );
    }
  };

  // Search projects
  const filteredProjects = projects.filter((project) => {
    const value = search.toLowerCase();

    return (
      project.name?.toLowerCase().includes(value) ||
      project.description?.toLowerCase().includes(value) ||
      project.status?.toLowerCase().includes(value) ||
      project.priority?.toLowerCase().includes(value)
    );
  });

  const statusStyles = {
    started:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",

    "In progress":
      "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",

    completed:
      "border-purple-400/20 bg-purple-400/10 text-purple-300",
  };

  const priorityStyles = {
    low: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",

    medium:
      "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",

    high:
      "border-red-400/20 bg-red-400/10 text-red-300",
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-600/10 blur-[130px]" />
      </div>

      {/* Main Content */}
      <main className="relative mx-auto max-w-[1250px] px-5 py-8 sm:px-8">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>

            <div className="mb-3 flex items-center gap-2 text-sm text-purple-300">
              <FolderKanban size={17} />
              <span>Workspace Management</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              All Projects
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage and track your workspace projects.
            </p>

          </div>

          <button
            onClick={handleModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02] hover:brightness-110"
          >
            <Plus size={18} />
            Create Project
          </button>

        </div>

        {/* Stats + Search */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          {/* Total Projects */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
              <FolderKanban size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Total Projects
              </p>

              <p className="text-xl font-semibold text-white">
                {projects.length}
              </p>
            </div>

          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-xs">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-purple-400/40 focus:bg-white/[0.06]"
            />

          </div>

        </div>

        {/* Projects Grid */}
        {loading ? (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
              />
            ))}

          </div>

        ) : filteredProjects.length === 0 ? (

          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">

            <FolderKanban
              size={40}
              className="mb-4 text-slate-600"
            />

            <h3 className="text-lg font-semibold text-slate-300">
              No projects found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {search
                ? "Try searching with a different project name."
                : "Create your first workspace project."}
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredProjects.map((project) => (

              <div
                key={project._id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.07] hover:shadow-purple-900/10"
              >

                {/* Card Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

                {/* Top */}
                <div className="relative flex items-start justify-between">

                  <div className="flex min-w-0 items-center gap-4">

                    {/* Project Icon */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-cyan-400/20 text-purple-200 ring-1 ring-white/10">
                      <FolderKanban size={25} />
                    </div>

                    <div className="min-w-0">

                      <h3 className="truncate text-base font-semibold text-white">
                        {project.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {project.description
                          ? `${project.description.substring(0, 10)}...`
                          : "No description..."}
                      </p>

                    </div>

                  </div>

                  <button className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-white">
                    <MoreHorizontal size={18} />
                  </button>

                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-white/[0.07]" />

                {/* Project Details */}
                <div className="space-y-4">

                  {/* Status + Priority */}
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                        Status
                      </p>

                      <span
                        className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-medium ${
                          statusStyles[project.status] ||
                          "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="text-right">

                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                        Priority
                      </p>

                      <span
                        className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-medium ${
                          priorityStyles[project.priority] ||
                          "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {project.priority}
                      </span>

                    </div>

                  </div>

                  {/* Dates */}
                  <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">

                    <div className="flex items-center gap-2">

                      <CalendarDays
                        size={15}
                        className="text-purple-300"
                      />

                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-slate-500">
                          Start
                        </p>

                        <p className="mt-0.5 text-xs text-slate-300">
                          {project.startDate
                            ? new Date(
                                project.startDate
                              ).toLocaleDateString()
                            : "—"}
                        </p>
                      </div>

                    </div>

                    <div className="text-right">

                      <p className="text-[9px] uppercase tracking-widest text-slate-500">
                        End
                      </p>

                      <p className="mt-0.5 text-xs text-slate-300">
                        {project.endDate
                          ? new Date(
                              project.endDate
                            ).toLocaleDateString()
                          : "—"}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      {/* Modal */}
      {modal && (

        <main className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/60 px-4 backdrop-blur-md">

          <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#151b35] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

            {/* Top Accent */}
            <div className="h-1 w-full bg-gradient-to-r from-[#743bd7] via-[#9b65ed] to-[#5c1eb2]" />

            {/* Close */}
            <button
              type="button"
              onClick={handleModal}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-[#858198] transition hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="px-8 pb-6 pt-8">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#743bd7]/15 text-[#b995ff]">
                  <FolderKanban size={24} />
                </div>

                <div>

                  <h2 className="text-[24px] font-semibold tracking-tight text-[#eeeaff]">
                    Create New Project
                  </h2>

                  <p className="mt-1 text-sm text-[#858198]">
                    Add a new project to your workspace.
                  </p>

                </div>

              </div>

            </div>

            <div className="h-px bg-white/8" />

            {/* Form */}
            <div className="px-8 py-7">

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Project Name */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    PROJECT NAME
                  </label>

                  <div className="relative">

                    <FolderKanban
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <input
                      type="text"
                      placeholder="Website Project"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      className="h-12 w-full rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#666276] focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    />

                  </div>
                </div>

                {/* Status */}
                <div>

                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    STATUS
                  </label>

                  <div className="relative">

                    <CircleDot
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <select
                      value={data.status}
                      name="status"
                      onChange={handleChange}
                      className="h-12 w-full appearance-none rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    >

                      <option
                        value=""
                        disabled
                        className="bg-[#202641]"
                      >
                        Select status
                      </option>

                      <option
                        value="started"
                        className="bg-[#202641]"
                      >
                        Started
                      </option>

                      <option
                        value="In progress"
                        className="bg-[#202641]"
                      >
                        In Progress
                      </option>

                      <option
                        value="completed"
                        className="bg-[#202641]"
                      >
                        Completed
                      </option>

                    </select>

                  </div>

                </div>

                {/* Description */}
                <div className="sm:col-span-2">

                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    DESCRIPTION
                  </label>

                  <textarea
                    placeholder="Enter project description..."
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/10 bg-[#202641] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#666276] focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                  />

                </div>

                {/* Priority */}
                <div>

                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    PRIORITY
                  </label>

                  <div className="relative">

                    <Flag
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <select
                      value={data.priority}
                      name="priority"
                      onChange={handleChange}
                      className="h-12 w-full appearance-none rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    >

                      <option
                        value=""
                        disabled
                        className="bg-[#202641]"
                      >
                        Select priority
                      </option>

                      <option
                        value="low"
                        className="bg-[#202641]"
                      >
                        Low
                      </option>

                      <option
                        value="medium"
                        className="bg-[#202641]"
                      >
                        Medium
                      </option>

                      <option
                        value="high"
                        className="bg-[#202641]"
                      >
                        High
                      </option>

                    </select>

                  </div>

                </div>

                {/* Start Date */}
                <div>

                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    START DATE
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <input
                      type="date"
                      name="startDate"
                      value={data.startDate}
                      onChange={handleChange}
                      className="h-12 w-full rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    />

                  </div>

                </div>

                {/* End Date */}
                <div>

                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    END DATE
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <input
                      type="date"
                      name="endDate"
                      value={data.endDate}
                      onChange={handleChange}
                      className="h-12 w-full rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    />

                  </div>

                </div>

              </div>

              {/* Info */}
              <div className="mt-6 rounded-lg border border-[#743bd7]/15 bg-[#743bd7]/5 px-4 py-3">

                <p className="text-xs leading-5 text-[#928da2]">
                  The project will be created with the selected status,
                  priority, and project timeline.
                </p>

              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-white/8 bg-[#12172d]/50 px-8 py-5">

              <button
                type="button"
                onClick={handleModal}
                className="h-11 rounded-lg border border-white/10 px-5 text-sm font-semibold text-[#aaa6b8] transition hover:bg-white/5 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="h-11 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-6 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:brightness-110"
              >
                Create Project
              </button>

            </div>

          </div>

        </main>

      )}

    </div>
  );
}

export default Page;