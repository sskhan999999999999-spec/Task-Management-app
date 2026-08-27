"use client"
import axios from 'axios'
import { LockKeyhole, Mail, ShieldCheck, User, X } from 'lucide-react'
import React, { useState } from 'react'

function page() {
  const [modal,setModal] = useState(false)
  const [data,setData] = useState({
    username: "",
    email:"",
    password: "",
    role: ""
  })
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setData(prev=>({...prev, [name]:value}))
  }
  const handleModal = ()=>{
     setModal(!modal)
  }
  const handleSubmit = ()=>{
    axios.post("http://localhost:8000/api/create-user",data)
    .then(result=>{
      console.log(result);
    })
    .catch(err=>{
      console.log(err,"something went wrong while creating user ");
      
    })
    setData({
      username: "",
      email:"",
      password: "",
      role: ""
    })
    setModal(false)
  }
  return (
    <div>
      welcome to users page
      <div className='absolute top-5 right-10 '>
        <button onClick={handleModal} className="rounded-xl bg-linear-to-r from-[#6366f1] to-[#06b6d4] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90">
        Create User
      </button>

      </div>

      {/* Modal */}
 {modal && <main className="min-h-screen bg-linear-to-r from-[#29205f] via-[#202451] to-[#0c3141] px-5">

      {/* Background Header */}
      <header className="mx-auto flex max-w-[1150px] items-center justify-between py-7">
        <h1 className="text-5xl font-light text-[#d2c2ff]">
          Aether Task
        </h1>

        <button className="font-semibold text-[#bcb8c9] hover:text-white">
          Dashboard
        </button>
      </header>

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">

        {/* Modal */}
        <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 bg-[#151b35] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">

          {/* Top Accent */}
          <div className="h-1 w-full bg-linear-to-r from-[#743bd7] via-[#9b65ed] to-[#5c1eb2]" />

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

              {/* Icon */}
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

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* Form */}
          <div className="px-8 py-7">

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-[11px] font-bold tracking-[0.12em] text-[#b9b4c8]">
                  Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777289]"
                  />

                  <input
                    type="text"
                    placeholder="John Doe"
                    name='username'
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
                    name='email'
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
                    name='password'
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
                    name='role'
                    onChange={handleChange}
                    className="h-12 w-full appearance-none rounded-lg border border-white/10 bg-[#202641] pl-11 pr-4 text-sm text-white outline-none transition focus:border-[#8b5bd6] focus:ring-2 focus:ring-[#743bd7]/15"
                  >
                    <option value="" disabled className="bg-[#202641]">
                      Select role
                    </option>

                    <option
                      value="employee"
                      className="bg-[#202641]"
                    >
                      Employee
                    </option>

                    <option
                      value="projectManager"
                      className="bg-[#202641]"
                    >
                      Project Manager
                    </option>

                    <option
                      value="admin"
                      className="bg-[#202641]"
                    >
                      Admin
                    </option>
                  </select>
                </div>
              </div>

            </div>

            {/* Info */}
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
              className="h-11 rounded-lg bg-linear-to-r from-[#6366f1] to-[#06b6d4] px-6 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:brightness-110"
            >
              Create User
            </button>

          </div>

        </div>
      </div>

    </main>}
    </div>
  )
}

export default page
