"use client";

import axios from "axios";
import {
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
  X,
  Users,
  Search,
  UserPlus,
  MoreHorizontal,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function Page() {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModal = () => {
    setModal(!modal);
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const accessToken = localStorage.getItem("accessToken");

      const result = await axios.get(
        "http://localhost:8000/api/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUsers(result.data.users);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user
  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.post(
        "http://localhost:8000/api/create-user",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      
      await fetchUsers();

      setData({
        username: "",
        email: "",
        password: "",
        role: "",
      });

      setModal(false);
    } catch (err) {
      console.log(
        err.response?.data || err.message,
        "something went wrong while creating user"
      );
    }
  };

  // Search users
  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.username?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.role?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="relative min-h-screen overflow-hidden  text-white">

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
              <Users size={17} />
              <span>Workspace Management</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              All Users
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage your workspace members and their permissions.
            </p>
          </div>

          <button
            onClick={handleModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:scale-[1.02] hover:brightness-110"
          >
            <UserPlus size={18} />
            Create User
          </button>

        </div>

        {/* Stats + Search */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
              <Users size={20} />
            </div>

            <div>
              <p className="text-xs text-slate-400">Total Members</p>
              <p className="text-xl font-semibold text-white">
                {users.length}
              </p>
            </div>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-slate-500 focus:border-purple-400/40 focus:bg-white/[0.06]"
            />
          </div>

        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
            <Users size={40} className="mb-4 text-slate-600" />

            <h3 className="text-lg font-semibold text-slate-300">
              No users found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {search
                ? "Try searching with a different name or email."
                : "Create your first workspace member."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {filteredUsers.map((user) => {

              const initials = user.username
                ?.split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              const roleStyles = {
                admin: "border-red-400/20 bg-red-400/10 text-red-300",
                projectManager:
                  "border-purple-400/20 bg-purple-400/10 text-purple-300",
                employee:
                  "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
              };

              return (
                <div
                  key={user._id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.07] hover:shadow-purple-900/10"
                >

                  {/* Card Glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/20" />

                  {/* Top */}
                  <div className="relative flex items-start justify-between">

                    <div className="flex items-center gap-4">

                      {/* Avatar */}
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-cyan-400/20 text-lg font-semibold text-purple-200 ring-1 ring-white/10">
                        {initials || "U"}

                        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#151b35] bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold text-white">
                          {user.username}
                        </h3>

                        <p className="mt-1 truncate text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>

                    </div>

                    <button className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-white">
                      <MoreHorizontal size={18} />
                    </button>

                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px bg-white/[0.07]" />

                  {/* Bottom */}
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                        Role
                      </p>

                      <span
                        className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-medium ${
                          roleStyles[user.role] ||
                          "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {user.role === "projectManager"
                          ? "Project Manager"
                          : user.role}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                        Status
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}

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
                  <User size={24} />
                </div>

                <div>
                  <h2 className="text-[24px] font-semibold tracking-tight text-[#eeeaff]">
                    Create New User
                  </h2>

                  <p className="mt-1 text-sm text-[#858198]">
                    Add a new member to your workspace.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/8" />

            {/* Form */}
            <div className="px-8 py-7">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    NAME
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <input
                      type="text"
                      placeholder="John Doe"
                      name="username"
                      value={data.username}
                      onChange={handleChange}
                      className="h-12 w-full rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#666276] focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    EMAIL ADDRESS
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <input
                      type="email"
                      placeholder="john@example.com"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="h-12 w-full rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#666276] focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    PASSWORD
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <input
                      type="password"
                      placeholder="••••••••"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      className="h-12 w-full rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#666276] focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                    USER ROLE
                  </label>

                  <div className="relative">
                    <ShieldCheck
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                    />

                    <select
                      value={data.role}
                      name="role"
                      onChange={handleChange}
                      className="h-12 w-full appearance-none rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                    >
                      <option value="" disabled className="bg-[#202641]">
                        Select role
                      </option>

                      <option value="employee" className="bg-[#202641]">
                        Employee
                      </option>

                      <option value="projectManager" className="bg-[#202641]">
                        Project Manager
                      </option>

                      <option value="admin" className="bg-[#202641]">
                        Admin
                      </option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="mt-6 rounded-lg border border-[#743bd7]/15 bg-[#743bd7]/5 px-4 py-3">
                <p className="text-xs leading-5 text-[#928da2]">
                  The user will be created with the selected role and can
                  access the workspace according to their permissions.
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
                Create User
              </button>

            </div>

          </div>
        </main>
      )}

    </div>
  );
}

export default Page;

