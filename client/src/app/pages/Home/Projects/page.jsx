"use client"
import React, { useState } from 'react'


function page() {

  const [modal,setModal] = useState(false)
  const handleModal = ()=>{
    setModal(!modal)
  }
  return (
    <div>
      <div className='absolute top-5 right-10 '>
        <button onClick={handleModal} className="rounded-xl bg-linear-to-r from-[#6366f1] to-[#06b6d4] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90">
        Create Project
      </button>

      </div>
      {modal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md">

  <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#15183a]/95 shadow-2xl shadow-black/40">

    {/* Header */}
    <div className="border-b border-white/10 px-6 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Create New Project
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Add a new task to your workspace
          </p>
        </div>

        <button onClick={handleModal} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white">
          ✕
        </button>
      </div>
    </div>

    {/* Body */}
    <div className="space-y-5 px-6 py-6">

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Project Title
        </label>

        <input
          type="text"
          placeholder="Enter task title"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/10"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Description
        </label>

        <textarea
          rows="4"
          placeholder="Describe your task..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 focus:bg-white/10 focus:ring-2 focus:ring-cyan-400/10"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Priority
          </label>

          <select className="w-full rounded-xl border border-white/10 bg-[#202451] px-4 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Due Date
          </label>

          <input
            type="date"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
          />
        </div>
        

      </div>
    </div>
    <div className='p-4'>
           <label className="mb-2  text-sm font-medium text-slate-300">
            Asign to
          </label>
          <input
            // type="date"
            className="w-full  rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
          />
        </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 border-t border-white/10 bg-black/10 px-6 py-4">

      <button onClick={handleModal} className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white">
        Cancel
      </button>

      <button className="rounded-xl bg-gradient-to-r from-[#6366f1] to-[#06b6d4] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90">
        Create Task
      </button>

    </div>

  </div>
</div>}
    </div>
  )
}

export default page
