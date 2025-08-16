"use client";

import Link from "next/link";
import { Loginaction } from "src/utils/actions/actions";
import { EyeIcon } from "src/assets/svgComp";
import { useState } from "react";
import { useActionState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow flex items-center justify-center min-h-screen bg-black px-4 py-30">
        <div className="w-full max-w-md">
          <div className="border border-zinc-800 rounded-2xl  bg-zinc-900 overflow-hidden shadow-lg ">
            <div className="h-2 bg-gradient-to-r from-blue-100 to-cyan-500"></div>
            <div className="p-8">
              <Link
                href="/"
                className="inline-flex items-center text-center text-sm text-gray-400 hover:text-blue-400 mb-6"
              >
                {/* <ArrowLeft className="w-4 h-4 mr-1" /> */}
                Back to homepage
              </Link>
              <h1 className="flex text-2xl font-bold md-6 text-white justify-center">
                Login
              </h1>

              <form action={Loginaction} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-300 "
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500  focus:border-transparent"
                      required
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <EyeIcon selected={showPassword} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-300 text-black py-3 font-medium rounded-lg hover:bg-cyan-400 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
