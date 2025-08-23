"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function Loginaction(formData: FormData) {
  try {
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

    // Store token in a cookie or session here if needed
    // e.g. setCookie("orgToken", data.token, { httpOnly: true });

    // Redirect from server after login success
    redirect("/");
  } catch (error) {
    console.error("Got error while signing in", error);
    throw error;
  }
}


// export async function registerAction(formData: FormData, code?: string) {
//   try {
//     const payload: any = {
//       firstName: formData.get("firstName"),
//       lastName: formData.get("lastName"),
//       email: formData.get("email"),
//       password: formData.get("password"),
//     };

//     if (code) payload.code = code;

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Signup failed:", response.status, data);
//       return { success: false, message: data.message || "Signup failed" };
//     }

//     return data;
//   } catch (error) {
//     console.error("Error in registerAction:", error);
//     throw error;
//   }
// }


export async function registerAction(formData: FormData, code?: string) {
  try {
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

    // ✅ Store token in HttpOnly cookie
    cookies().set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // ✅ Redirect user straight to dashboard (already logged in)
    redirect("/");
  } catch (error: any) {
    console.error("Error in registerAction:", error);
    throw new Error(error.message || "Something went wrong");
  }
}
