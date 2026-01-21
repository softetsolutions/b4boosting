"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EyeIcon } from "src/assets/svgComp";
import { useState } from "react";
import { Loginaction } from "src/utils/actions/actions";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  async function clientSafeAction(formData: FormData) {
    try {
      const result = await Loginaction(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      } else {
        toast.success(result.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes("NEXT_REDIRECT")) return;

        toast.error(err.message);
      } else {
        toast.error("Login failed");
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Failed to redirect to Google sign-in", error);
      toast.error("Failed to redirect to Google sign-in");
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-300 to-cyan-500"></div>

            <div className="p-8">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to homepage
              </Link>

              <h1 className="text-2xl font-bold text-white text-center mb-6">
                Login
              </h1>

              {/* Form submits directly to server action */}
              <form action={clientSafeAction} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-300">
                      Password
                    </label>
                    {/* <Link
                      href="/forgot-password"
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      Forgot Password?
                    </Link> */}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      required
                      className="w-full p-3 bg-zinc-800 border border-zinc-700 placeholder-gray-400 rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      aria-label="Toggle password visibility"
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <EyeIcon selected={showPassword} />
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 accent-blue-400 rounded focus:ring-cyan-500"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                {/* Submit */}
                <button
                  aria-label="Submit"
                  type="submit"
                  className="w-full py-3 font-medium rounded-lg flex items-center justify-center bg-cyan-400 hover:bg-cyan-300 text-black transition"
                >
                  Sign In
                </button>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-zinc-800" />
                <span className="px-3 text-xs text-gray-500 uppercase tracking-wide">
                  or
                </span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loadingGoogle}
                className="w-full py-3 font-medium rounded-lg flex items-center justify-center border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-gray-100 transition disabled:opacity-60"
              >
                {loadingGoogle ? (
                  <span className="text-sm">Connecting to Google...</span>
                ) : (
                  <>
                    {/* You can replace this with an actual Google icon */}
                    <span className="mr-2 text-lg">🚀</span>
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>

              <div className="mt-8 text-center text-sm text-gray-400">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-cyan-400 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
