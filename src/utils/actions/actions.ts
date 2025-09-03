"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export async function Loginaction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }
    console.log("data is", data);
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    redirect("/");
  } catch (error) {
    console.error("Got error while signing in", error);
    throw error;
  }
}
export async function registerAction(formData: FormData, code?: string) {
  try {
    const cookieStore = await cookies();
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
    } as Record<string, string>;
    if (code) payload.code = code;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }
    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    // Redirect user straight to dashboard (already logged in)
    redirect("/");
  } catch (error: any) {
    console.error("Error in registerAction:", error);
    throw new Error(error.message || "Something went wrong");
  }
}