"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const isProd = process.env.NODE_ENV === "production";

export async function Loginaction(formData: FormData) {

  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });
  const data = await res.json();
  console.log("data", data);
  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Something went wrong",
    };
  }

  cookieStore.set("token", data.token, {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    domain: isProd ? ".b4boosting.com" : undefined,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  cookieStore.set("userId", data.user.id, {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    domain: isProd ? ".b4boosting.com" : undefined,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  cookieStore.set("affiliateId", data.user.affiliateId, {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    domain: isProd ? ".b4boosting.com" : undefined,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  redirect(data.user.role === "admin" ? "/admin" : `/`);

}
export async function registerAction(formData: FormData) {
   const cookieStore = await cookies();
  try {
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      affiliateRef: cookieStore.get("affiliateRef")?.value,
    } as Record<string, string>;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        credentials: "include",
      },
    );

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Something went wrong",
      };
    }
    return {
  success: true,
  message: "Registration successful. Please verify your email.",
};

  
  } catch (error) {
    console.error("registerAction error:", error);
    return {
      success: false,
      message: "Server error. Please try again later.",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";

  const baseOptions = {
    path: "/",
    ...(isProd && { domain: ".b4boosting.com" }),
  };

  cookieStore.delete({ name: "token", ...baseOptions });
  cookieStore.delete({ name: "userId", ...baseOptions });
  cookieStore.delete({ name: "affiliateRef", ...baseOptions });
  cookieStore.delete({ name: "affiliateId", ...baseOptions });

  redirect("/login");
}
