"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * Login Action
 * Sends credentials to backend -> saves JWT in HttpOnly cookie -> redirects
 */
export async function LoginAction(formData: FormData) {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      cache: "no-store",
    });

    const data = await res.json();
    console.log(data);
    

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save JWT securely
    const cookieStore =await cookies();
    cookieStore.set("userToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Redirect to dashboard
    redirect("/");
  } catch (error: any) {
    console.error("Login error:", error);
    redirect("/login?error=" + encodeURIComponent(error.message));
  }
}

/**
 * Register Action
 * Calls backend register API -> saves JWT -> redirects
 */
export async function registerAction(formData: FormData, code?: string) {
  try {
    const payload: Record<string, string> = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (code) payload.code = code;

    const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    // Save JWT securely
    const cookieStore =await cookies();
    cookieStore.set("userToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Redirect to dashboard
    redirect("/");
  } catch (error: any) {
    console.error("Register error:", error);
    redirect("/register?error=" + encodeURIComponent(error.message));
  }
}
