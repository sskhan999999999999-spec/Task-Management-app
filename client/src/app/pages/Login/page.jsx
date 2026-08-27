"use client";
import { redirect, useRouter } from "next/navigation";
import { Mail, LockKeyhole, ArrowRight, UserStar } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
    const [data,setData] = useState({
      email: "",
      password: ""
    })
   
    const router = useRouter()
    useEffect(()=>{
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken) {
        router.replace("/pages/Home/Dashboard")
      }
    },[router])
   

    const handleChange = (e)=>{
      const {name,value} = e.target
      setData(prev=>({...prev, [name] : value}))
    }

    const handleSubmit = (e)=>{
      e.preventDefault()
      if(!data.email || !data.password ){
        toast.error("email or password is required")
        return
      }
      axios.post(
    "http://localhost:8000/api/login",
    data,
)
.then(result => {
    console.log(result.data);
    const accessToken = result.data.accessToken

    localStorage.setItem("accessToken",result.data.accessToken)
    localStorage.setItem("refreshToken",result.data.refreshToken)

console.log("Saved token:", localStorage.getItem("accessToken"));
    if (!accessToken) {
        router.push("/pages/Login");
    }
    console.log(accessToken);
    
})
.catch(err => {
    console.log(err, "error while logging in");
    toast.error('error while logining in')
});
    }

  return (
    <main className="min-h-screen bg-linear-to-r from-[#29205f] via-[#202451] to-[#0c3141] px-5">
      <Toaster/>
      {/* Header */}
      <header className="mx-auto flex max-w-[1150px] items-center justify-between py-7">
        <h1 className="text-5xl font-light text-[#d2c2ff]">
          Aether Task
        </h1>

        <button className="font-semibold text-[#bcb8c9] hover:text-white">
          Create Account
        </button>
      </header>

      {/* Login Card */}
      <section className="flex min-h-[calc(100vh-120px)] items-center justify-center">

        <div className="w-full max-w-[448px] rounded-2xl border border-white/15 bg-[#18203d]/80 p-10 shadow-2xl backdrop-blur-md">

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-[25px] font-bold text-[#d5c7ff]">
              Welcome Back
            </h2>

            <p className="mt-2 text-[#c4bfce]">
              Sign in to find your focus.
            </p>
          </div>

          {/* Form */}
          <form className="mt-9">

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-bold tracking-wider text-[#d7d2e2]">
                EMAIL ADDRESS
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9995a8]"
                />

                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  placeholder="you@example.com"
                  className="h-[50px] w-full rounded-lg bg-white pl-11 pr-4 text-[#343241] outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-6">

              <div className="mb-2 flex justify-between">
                <label className="text-xs font-bold tracking-wider text-[#d7d2e2]">
                  PASSWORD
                </label>

                <button
                  type="button"
                  className="text-sm font-semibold text-[#b29bd9] hover:text-white"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9995a8]"
                />

                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-[50px] w-full rounded-lg bg-white pl-11 pr-4 text-[#343241] outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-8 flex h-[61px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#743bd7] to-[#5c1eb2] text-lg font-bold text-white transition hover:brightness-110"
            >
              Sign In
              <ArrowRight size={25} />
            </button>

          </form>

          {/* OR */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-[#77748a]">
              OR
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Sign Up */}
          <p className="text-center text-[#c4bfce]">
            Don`&apos`t have an account?{" "}
            <button className="font-bold text-[#c0a9e6] hover:text-white"
            
            onClick={()=> {router.push("/pages/Signup")}}
            >
              Sign Up
            </button>
          </p>

        </div>
      </section>

    </main>
  );
}