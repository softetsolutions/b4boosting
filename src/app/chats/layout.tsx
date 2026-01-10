import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import AuthProvider from "src/utils/providers/AuthProvider";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
   affiliateId?: string;
  [key: string]: unknown;
  
}

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded: AuthTokenPayload;
  try {
    decoded = jwtDecode<AuthTokenPayload>(token!);
  } catch (error) {
    console.error("Error decoding token:", error);
    redirect("/login");
  }

  return <AuthProvider value={decoded}>{children}</AuthProvider>;
}
