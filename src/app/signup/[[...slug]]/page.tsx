"use client";

import Link from "next/link";
import { useState } from "react";
import { EyeIcon } from "src/assets/svgComp";
import { ArrowLeft } from "lucide-react";
import { registerAction } from "src/utils/actions/actions";
import toast from "react-hot-toast";

export default function SignupPage({ params }: { params: { slug?: string[] } }) {
  const code = params?.slug?.[0]; // undefined if /signup, or "abc123" if /signup/abc123

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function clientSafeAction(formData: FormData) {
    try {
      await registerAction(formData, code);
      // ✅ no need to redirect, server action already did it
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-lg">
            <div className="h-2 bg-gradient-to-r from-blue-300 to-cyan-500"></div>
            <div className="p-8">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">
                  {code ? "Signup with Invite Code" : "Create Account"}
                </h1>
                <p className="text-gray-400">
                  {code
                    ? "You’re signing up with a referral/invite code."
                    : "Fill in your details to get started"}
                </p>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {/* ✅ Use server action directly */}
              <form action={clientSafeAction} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    placeholder="First Name"
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    placeholder="Last Name"
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg pr-10 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                    >
                      <EyeIcon selected={showPassword} />
                    </button>
                  </div>
                </div>

                {code && (
                  <p className="text-sm text-gray-400 text-center">
                    Invite code applied:{" "}
                    <span className="text-cyan-400 font-medium">{code}</span>
                  </p>
                )}

                <div className="text-sm text-gray-400 text-center mb-4">
                  By registering, you agree to our{" "}
                  <Link
                    href="/terms-conditions"
                    className="text-cyan-400 hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-cyan-400 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>

                <button
                  type="submit"
                  className="w-full py-3 font-medium rounded-lg transition flex items-center justify-center bg-cyan-400 hover:bg-cyan-300 text-black"
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-cyan-400 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
